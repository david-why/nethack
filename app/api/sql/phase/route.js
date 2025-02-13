"use server"
import getConnection from "@/api/sql/database";

export async function GET(request) {
    let connection;
    try {
        connection = await getConnection();
        const [pullResults] = await connection.query("SELECT * FROM phases");
        console.log(pullResults);
        const sortedResults = pullResults.sort((a, b) => new Date(a.activated) - new Date(b.activated));

        return new Response(JSON.stringify(sortedResults), {
            status: 200,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } catch (error) {
        console.log("Error in pulling", error);
        return new Response(JSON.stringify({ error: "Database error", details: error.message }), {
            status: 500,
            headers: {
                'Content-Type': 'application/json',
            },
        });
    } finally {
        if (connection) {
            connection.release();
        }
    }
}
