'use client';
import { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import Home from './page';
import { fetchAndStoreArticles } from '../lib/rssParser';
import axios from 'axios';

export default function Entry() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchData = async () => {
            try {
                console.log('Fetching and storing articles on first page load...');
                await axios.get('api/get-all').then((res) => {
                    setLoading(false);
                    console.log(res)
                })
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
                <p>Articles are loading...</p>
                <Skeleton count={2} />
                <Skeleton count={2} />
            </div></main>
        );
    }
    return (
        <Home />
    );
}
