'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@affiliate-template/ui';
import { Button } from '@affiliate-template/ui';
import { Plus, FileText, Image, Users, Tag, Folder } from 'lucide-react';

interface CMSStats {
  posts: number;
  pages: number;
  media: number;
  users: number;
  categories: number;
  tags: number;
}

interface CMSCollection {
  name: string;
  count: number;
  icon: React.ReactNode;
  description: string;
}

export default function CMSDashboard() {
  const [stats, setStats] = useState<CMSStats>({
    posts: 0,
    pages: 0,
    media: 0,
    users: 0,
    categories: 0,
    tags: 0,
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCMSStats();
  }, []);

  const fetchCMSStats = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/cms');
      
      if (!response.ok) {
        throw new Error('Failed to fetch CMS stats');
      }

      const data = await response.json();
      // Mock stats for now - in real implementation, this would come from Payload
      setStats({
        posts: 12,
        pages: 5,
        media: 45,
        users: 3,
        categories: 8,
        tags: 24,
      });
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  const collections: CMSCollection[] = [
    {
      name: 'Posts',
      count: stats.posts,
      icon: <FileText className="h-4 w-4" />,
      description: 'Blog posts and articles',
    },
    {
      name: 'Pages',
      count: stats.pages,
      icon: <FileText className="h-4 w-4" />,
      description: 'Static pages',
    },
    {
      name: 'Media',
      count: stats.media,
      icon: <Image className="h-4 w-4" />,
      description: 'Images and files',
    },
    {
      name: 'Users',
      count: stats.users,
      icon: <Users className="h-4 w-4" />,
      description: 'CMS users and authors',
    },
    {
      name: 'Categories',
      count: stats.categories,
      icon: <Folder className="h-4 w-4" />,
      description: 'Post categories',
    },
    {
      name: 'Tags',
      count: stats.tags,
      icon: <Tag className="h-4 w-4" />,
      description: 'Post tags',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-lg">Loading CMS dashboard...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="text-red-600">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold">Content Management</h2>
          <p className="text-muted-foreground">
            Manage your blog posts, pages, and media
          </p>
        </div>
        <Button>
          <Plus className="h-4 w-4 mr-2" />
          Create Post
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {collections.map((collection) => (
          <Card key={collection.name} className="hover:shadow-md transition-shadow">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {collection.name}
              </CardTitle>
              {collection.icon}
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{collection.count}</div>
              <p className="text-xs text-muted-foreground">
                {collection.description}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Recent Posts</CardTitle>
            <CardDescription>
              Your latest blog posts and articles
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Getting Started with Affiliate Marketing</h4>
                  <p className="text-sm text-muted-foreground">Published 2 days ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
              <div className="flex items-center justify-between p-3 border rounded-lg">
                <div>
                  <h4 className="font-medium">Top 10 Amazon Products for 2024</h4>
                  <p className="text-sm text-muted-foreground">Published 1 week ago</p>
                </div>
                <Button variant="outline" size="sm">
                  Edit
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common content management tasks
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <Button className="w-full justify-start" variant="outline">
                <Plus className="h-4 w-4 mr-2" />
                Create New Post
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Image className="h-4 w-4 mr-2" />
                Upload Media
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Users className="h-4 w-4 mr-2" />
                Manage Users
              </Button>
              <Button className="w-full justify-start" variant="outline">
                <Tag className="h-4 w-4 mr-2" />
                Manage Categories
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
} 