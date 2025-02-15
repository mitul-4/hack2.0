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
      `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
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
    const { barcodes } = await req.json() as { barcodes: string[] };

    if (!barcodes || !Array.isArray(barcodes)) {
      return NextResponse.json(
        { error: 'Invalid barcodes data' },
        { status: 400 }
      );
    }

    // Process multiple barcodes in parallel
    const results = await Promise.all(
      barcodes.map(async (barcode) => {
        try {
          const response = await axios.get(
            `https://world.openfoodfacts.org/api/v0/product/${barcode}.json`
          );

          if (!response.data.status) {
            return {
              barcode,
              error: 'Product not found'
            };
          }

          const productData = response.data.product;
          const productInfo: ProductInfo = {
            product_name: productData.product_name || 'Unknown Product',
            quantity: productData.quantity || 'Not specified',
            serving_size: productData.serving_size || 'Not specified',
            ingredients_text: productData.ingredients_text || 'Not available',
            nutriments: productData.nutriments || {}
          };

          // Parse quantity
          let amount = null;
          let unit = null;
          
          if (productInfo.quantity) {
            const match = productInfo.quantity.match(/(\d+(?:\.\d+)?)\s*([a-zA-Z]+)/);
            if (match) {
              amount = parseFloat(match[1]);
              unit = match[2].toLowerCase();
            }
          }

          return {
            barcode,
            data: {
              ...productInfo,
              parsed_quantity: {
                amount,
                unit
              }
            }
          };
        } catch (error) {
          return {
            barcode,
            error: 'Failed to fetch product information'
          };
        }
      })
    );

    return NextResponse.json({
      success: true,
      results
    });

  } catch (error) {
    console.error('Error processing barcodes:', error);
    return NextResponse.json(
      { error: 'Failed to process barcodes' },
      { status: 500 }
    );
  }
} 