// Real-time crime feed integration
// This would integrate with actual news APIs for live data

export interface NewsAPI {
  name: string;
  endpoint: string;
  apiKey?: string;
  enabled: boolean;
}

export const NEWS_SOURCES: NewsAPI[] = [
  {
    name: "Google News API",
    endpoint: "https://newsapi.org/v2/everything",
    apiKey: process.env.NEWS_API_KEY,
    enabled: !!process.env.NEWS_API_KEY
  },
  {
    name: "News24 RSS",
    endpoint: "https://feeds.news24.com/articles/news24/SouthAfrica/rss",
    enabled: true
  },
  {
    name: "IOL Crime Feed",
    endpoint: "https://www.iol.co.za/news/crime-courts",
    enabled: true
  },
  {
    name: "TimesLive Crime",
    endpoint: "https://www.timeslive.co.za/news/crime-and-courts/",
    enabled: true
  }
];

export class RealTimeNewsIntegration {
  async fetchLatestCrimeNews(location: string, hours: number = 24): Promise<any[]> {
    console.log(`🔍 Fetching real news for ${location} from last ${hours} hours`);
    
    const results = [];
    
    for (const source of NEWS_SOURCES.filter(s => s.enabled)) {
      try {
        if (source.name === "Google News API" && source.apiKey) {
          const articles = await this.fetchFromNewsAPI(location, hours, source);
          results.push(...articles);
        } else {
          // RSS/Web scraping approach
          const articles = await this.fetchFromRSS(location, source);
          results.push(...articles);
        }
      } catch (error) {
        console.error(`❌ Failed to fetch from ${source.name}:`, error);
      }
    }
    
    return this.deduplicateAndRank(results);
  }
  
  private async fetchFromNewsAPI(location: string, hours: number, source: NewsAPI) {
    const fromDate = new Date(Date.now() - hours * 60 * 60 * 1000).toISOString();
    
    const response = await fetch(`${source.endpoint}?` + new URLSearchParams({
      q: `crime safety ${location} South Africa`,
      from: fromDate,
      sortBy: 'publishedAt',
      language: 'en',
      apiKey: source.apiKey!
    }));
    
    const data = await response.json();
    return data.articles || [];
  }
  
  private async fetchFromRSS(location: string, source: NewsAPI) {
    // Implement RSS parsing and web scraping
    // This would use cheerio or similar for web scraping
    return [];
  }
  
  private deduplicateAndRank(articles: any[]): any[] {
    // Remove duplicates and rank by relevance
    const seen = new Set();
    return articles
      .filter(article => {
        const key = article.title?.toLowerCase() || '';
        if (seen.has(key)) return false;
        seen.add(key);
        return true;
      })
      .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime())
      .slice(0, 10);
  }
}
