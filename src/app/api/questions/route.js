export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const amount = searchParams.get('amount') || '5';
    const category = searchParams.get('category') || '18';
    const type = searchParams.get('type') || 'multiple';

    const response = await fetch(
      `https://opentdb.com/api.php?amount=${amount}&category=${category}&type=${type}`,
      {
        headers: {
          'Content-Type': 'application/json',
        },
      }
    );

    if (!response.ok) {
      throw new Error(`OpenTDB API responded with status: ${response.status}`);
    }

    const data = await response.json();
    return Response.json(data);
  } catch (error) {
    console.error('API Route Error:', error);
    return Response.json(
      { error: 'Failed to fetch questions' },
      { status: 500 }
    );
  }
}
