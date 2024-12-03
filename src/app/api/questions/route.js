// Import Next.js Response utility for API responses
import { NextResponse } from 'next/server';

/**
 * GET handler for the /api/questions endpoint
 * Proxies requests to the Open Trivia Database API
 * Supports query parameters:
 * - amount: number of questions (default: 5)
 * - category: question category ID (default: 18 for Computer Science)
 * - type: question type (default: multiple for multiple choice)
 */
export async function GET(request) {
  try {
    // Get the URL object from the request to parse query parameters
    const { searchParams } = new URL(request.url);
    
    // Extract query parameters with defaults
    const amount = searchParams.get('amount') || '5';
    const category = searchParams.get('category') || '18'; // 18 = Computer Science
    const type = searchParams.get('type') || 'multiple';
    
    // Construct the Open Trivia DB API URL with query parameters
    const apiUrl = `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`;
    
    // Fetch questions from the Open Trivia DB
    const response = await fetch(apiUrl);
    const data = await response.json();
    
    // Validate API response
    if (data.response_code !== 0) {
      // Return error response if the API request was not successful
      return NextResponse.json(
        { error: 'Failed to fetch questions from Open Trivia DB' },
        { status: 500 }
      );
    }
    
    // Return successful response with quiz questions
    return NextResponse.json(data);
  } catch (error) {
    // Handle any unexpected errors during the request
    console.error('Error fetching questions:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
