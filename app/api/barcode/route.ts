import { NextRequest, NextResponse } from 'next/server';
import axios from 'axios';

interface ProductInfo {
  quantity: string;
  serving_size: string;
  product_name: string;
  ingredients_text: string;
  nutriments: {
    [key: string]: number;
  };
}

const OPEN_FOOD_FACTS_API = 'https://world.openfoodfacts.org/api/v0';

interface OpenFoodFactsProduct {
  product_name: string;
  quantity: string;
  serving_size?: string;
}

export async function GET(req: NextRequest) {
  try {
    const searchParams = req.nextUrl.searchParams;
    const barcode = searchParams.get('barcode');

    if (!barcode) {
      return NextResponse.json(
        { error: 'Barcode is required' },
        { status: 400 }
      );
    }

    // Call Open Food Facts API
    const response = await axios.get(
      `${OPEN_FOOD_FACTS_API}/product/${barcode}.json`
    );

    if (!response.data.status) {
      return NextResponse.json(
        { error: 'Product not found' },
        { status: 404 }
      );
    }

    const productData = response.data.product;

    // Extract relevant information
    const productInfo: ProductInfo = {
      product_name: productData.product_name || 'Unknown Product',
      quantity: productData.quantity || 'Not specified',
      serving_size: productData.serving_size || 'Not specified',
      ingredients_text: productData.ingredients_text || 'Not available',
      nutriments: productData.nutriments || {}
    };

    // Parse quantity into numerical value and unit
    let amount = null;
    let unit = null;
    
    if (productInfo.quantity) {
      const match = productInfo.quantity.match(/(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/);
      if (match) {
        amount = parseFloat(match[1]);
        unit = match[2].toLowerCase();
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        ...productInfo,
        parsed_quantity: {
          amount,
          unit
        }
      }
    });

  } catch (error) {
    console.error('Error fetching product information:', error);
    return NextResponse.json(
      { error: 'Failed to fetch product information' },
      { status: 500 }
    );
  }
}

// POST endpoint for batch processing multiple barcodes
export async function POST(req: NextRequest) {
  try {
    const { barcode } = await req.json();

    if (!barcode) {
      return NextResponse.json(
        { error: 'Barcode is required' },
        { status: 400 }
      );
    }

    // Call Open Food Facts API
    const response = await fetch(`${OPEN_FOOD_FACTS_API}/product/${barcode}.json`);
    
    if (!response.ok) {
      throw new Error('Product not found');
    }

    const data = await response.json();
    
    if (!data.product) {
      throw new Error('Product not found');
    }

    const product = data.product as OpenFoodFactsProduct;

    // Extract quantity from the product data
    let quantity = '1';
    let unit = 'piece';

    if (product.quantity) {
      const match = product.quantity.match(/(\d+(\.\d+)?)\s*([a-zA-Z]+)/);
      if (match) {
        quantity = match[1];
        unit = match[3].toLowerCase();
      }
    } else if (product.serving_size) {
      const match = product.serving_size.match(/(\d+(\.\d+)?)\s*([a-zA-Z]+)/);
      if (match) {
        quantity = match[1];
        unit = match[3].toLowerCase();
      }
    }

    return NextResponse.json({
      success: true,
      ingredients: [{
        name: product.product_name,
        quantity,
        unit
      }]
    });

  } catch (error) {
    console.error('Error processing barcode:', error);
    return NextResponse.json(
      { error: 'Failed to lookup product' },
      { status: 500 }
    );
  }
} 