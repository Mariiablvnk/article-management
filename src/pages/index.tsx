'use client';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Home from './page';
import { fetchAndStoreArticles } from '../lib/rssParser';

export default function Entry() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching and storing articles on first page load...');
                await fetchAndStoreArticles();
            } catch (error) {
                console.error('Error fetching articles:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <main><div>
                <Skeleton count={2} />
                <Skeleton count={2} />
            </div></main>
        );
    }
    return (
        <Home />
    );
}
