import { NextRequest, NextResponse } from 'next/server';
import { productService } from '@affiliate-template/db/src/utils';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const manufacturer = searchParams.get('manufacturer');
    const limit = parseInt(searchParams.get('limit') || '50');
    const offset = parseInt(searchParams.get('offset') || '0');

    let products;
    if (manufacturer) {
      products = await productService.findByManufacturer(manufacturer, {
        limit,
        offset
      });
    } else {
      products = await productService.findAll({
        limit,
        offset
      });
    }

    return NextResponse.json({
      success: true,
      data: products,
      pagination: {
        limit,
        offset,
        total: products.length
      }
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to fetch products' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    const product = await productService.create({
      name: body.name,
      description: body.description,
      manufacturer: body.manufacturer,
      basePrice: body.basePrice,
      mainImageUrl: body.mainImageUrl,
      specifications: body.specifications || {}
    });

    return NextResponse.json({
      success: true,
      data: product
    }, { status: 201 });
  } catch (error) {
    console.error('Error creating product:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to create product' },
      { status: 500 }
    );
  }
} 