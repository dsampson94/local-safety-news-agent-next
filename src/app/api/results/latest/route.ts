import { NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

export async function GET() {
  try {
    const dataDir = path.join(process.cwd(), 'data', 'results');
    
    // Check if directory exists
    try {
      await fs.access(dataDir);
    } catch {
      return NextResponse.json({ incidents: [] });
    }

    // Get list of result files
    const files = await fs.readdir(dataDir);
    const jsonFiles = files.filter(file => file.endsWith('.json'));

    if (jsonFiles.length === 0) {
      return NextResponse.json({ incidents: [] });
    }

    // Sort by filename (timestamp) to get the latest
    jsonFiles.sort((a, b) => b.localeCompare(a));
    const latestFile = jsonFiles[0];

    // Read the latest file
    const filePath = path.join(dataDir, latestFile);
    const fileContent = await fs.readFile(filePath, 'utf-8');
    const incidents = JSON.parse(fileContent);

    return NextResponse.json({ 
      incidents,
      timestamp: latestFile.replace('.json', ''),
      totalIncidents: incidents.length
    });

  } catch (error) {
    console.error("Error fetching latest results:", error);
    return NextResponse.json(
      { error: "Failed to fetch latest results" },
      { status: 500 }
    );
  }
}
