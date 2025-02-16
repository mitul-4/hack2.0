'use client';

import { useState } from 'react';
import Image from 'next/image';
import type { Recipe } from './AISubmit';

interface RecipeToFeedProps {
  recipe: Recipe;
  onSuccess?: () => void;
}

export default function RecipeToFeed({ recipe, onSuccess }: RecipeToFeedProps) {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePost = async () => {
    try {
      setLoading(true);
      setError(null);

      // First upload the image if one is selected
      let imageUrl = null;
      if (image) {
        const formData = new FormData();
        formData.append('file', image);
        
        const uploadRes = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (!uploadRes.ok) {
          throw new Error('Failed to upload image');
        }

        const uploadData = await uploadRes.json();
        imageUrl = uploadData.url;
      }

      // Create the post
      const response = await fetch('/api/posts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          recipe,
          image: imageUrl,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to create post');
      }

      // Clear form and call success callback
      setImage(null);
      setPreview(null);
      onSuccess?.();

    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-6 p-4 border border-gray-200 rounded-lg">
      <h3 className="text-lg font-semibold mb-4">Share this recipe</h3>
      
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Add a photo of your dish (optional)
        </label>
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
          id="recipe-image"
        />
        <label
          htmlFor="recipe-image"
          className="cursor-pointer block w-full p-4 border-2 border-dashed border-gray-300 rounded-lg hover:border-gray-400 transition-colors"
        >
          {preview ? (
            <div className="relative w-full h-48">
              <Image
                src={preview}
                alt="Recipe preview"
                fill
                className="object-cover rounded-lg"
              />
            </div>
          ) : (
            <div className="text-center">
              <p className="text-gray-600">Click to upload a photo</p>
            </div>
          )}
        </label>
      </div>

      <button
        onClick={handlePost}
        disabled={loading}
        className="w-full bg-[#00a36c] text-white py-2 px-4 rounded-full hover:bg-[#007f4c] disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {loading ? 'Posting...' : 'Share to Feed'}
      </button>

      {error && (
        <div className="mt-4 p-3 bg-red-100 text-red-700 rounded-md">
          {error}
        </div>
      )}
    </div>
  );
} 