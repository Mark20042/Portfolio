import { json } from '@sveltejs/kit';
import { env } from '$env/dynamic/private';

export async function GET() {
    const token = env.GITHUB_TOKEN;
    
    if (!token) {
        return json({ error: 'GITHUB_TOKEN is not set in the environment variables' }, { status: 500 });
    }

    const query = `
        query {
            user(login: "Mark20042") {
                contributionsCollection {
                    contributionCalendar {
                        weeks {
                            contributionDays {
                                contributionCount
                                date
                                color
                            }
                        }
                    }
                }
            }
        }
    `;

    try {
        const response = await fetch('https://api.github.com/graphql', {
            method: 'POST',
            headers: {
                'Authorization': `bearer ${token}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ query })
        });

        if (!response.ok) {
            const err = await response.text();
            console.error('GitHub API error:', err);
            return json({ error: `GitHub API error: ${response.status}` }, { status: 500 });
        }

        const data = await response.json();
        return json(data);
    } catch (error) {
        console.error('Error fetching GitHub contributions:', error);
        return json({ error: 'Failed to fetch GitHub contributions' }, { status: 500 });
    }
}
