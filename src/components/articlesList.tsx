import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Article, ArticleListProps } from '../lib/interfaces';
import { useRouter } from 'next/router';
import { useArticle } from '../context/articleProvider';
import Pagination from './pagination';
import SkeletonArticle from './sceletonArticle';

const ArticleList: React.FC<ArticleListProps> = ({ onDelete, onEdit, userRole = 'USER' }) => {
    const [articles, setArticles] = useState<Article[]>([]);
    const [query, setQuery] = useState<string>('');
    const [sort, setSort] = useState<string>('desc');
    const [role, setRole] = useState<string>('USER');
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const router = useRouter();
    const { setArticle } = useArticle();

    const handleShowMore = (article: Article) => {
        setArticle(article);
        router.push(`/articles/${article.id}`);
    };

    useEffect(() => {
        setRole(userRole);
    }, [userRole]);

    const fetchArticles = async () => {
        try {
            const response = await axios.get('/api/articles', {
                params: {
                    query,
                    page: currentPage,
                    sort,
                },
            });
            setArticles(response.data.articles);
            setTotalPages(response.data.totalPages);
        } catch (error) {
            console.error('Error fetching articles:', error);
        }
    };

    useEffect(() => {
        fetchArticles();
    }, [query, currentPage, sort]);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        setCurrentPage(1);
    };

    const handlePageChange = (page: number) => {
        setCurrentPage(page);
    };

    return (
        <div className="flex flex-col items-center p-4">
            <form onSubmit={handleSearch} className="w-full flex flex-col md:flex-row justify-between md:w-4/5 lg:w-3/4 gap-4 mb-6">
                <div className='flex flex-row gap-4'>
                    <input
                        type="text"
                        placeholder="Search articles..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="bg-white text-sm border border-black rounded-md px-4 py-2 w-full md:w-2/3 placeholder-grey font-poppins"
                    />
                    <button
                        type="submit"
                        className="bg-pink text-black px-4 py-2 rounded-md shadow hover:bg-pink-700 transition font-poppins"
                    >
                        Search
                    </button>
                </div>
                <select
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                    className="bg-white text-sm border border-black rounded-md px-4  font-poppins"
                >
                    <option value="desc">Newest First</option>
                    <option value="asc">Oldest First</option>
                </select>
            </form>

            <ul className="w-full md:w-4/5 lg:grid align-baseline justify-between gap-16 grid-cols-2 p-4">
                {articles.length < 1 ? (
                    <SkeletonArticle />
                ) : (
                    articles.map((article) => (
                        <li data-aos="fade-left"
                            data-aos-anchor="#example-anchor"
                            data-aos-offset="500"
                            data-aos-duration="500"
                            key={article.id}
                            className="p-4 border mb-6 border-grey rounded-md  m-0 w-full shadow-sm hover:shadow-lg transition"
                        >
                            <h2 className="text-xl font-bebas text-black mb-2">{article.title}</h2>
                            <p className="text-black/70 mb-2">
                                {article.subtitle && article.subtitle.length > 100
                                    ? `${article.subtitle.substring(0, 100)}...`
                                    : article.subtitle}
                            </p>
                            <p className="text-black/90 text-sm font-poppins">
                                <small>{new Date(article.pubDate).toLocaleDateString()}</small>
                            </p>

                            {role !== 'ADMIN' && (
                                <button
                                    onClick={() => handleShowMore(article)}
                                    className="mt-2   bg-green text-white px-4 py-2 rounded-md shadow hover:bg-green-600 transition font-poppins"
                                >
                                    Show more
                                </button>
                            )}

                            {role === 'ADMIN' && onEdit && (
                                <button
                                    onClick={() => { onEdit(article); fetchArticles(); }}
                                    className="mt-2 bg-ochra text-black px-4 py-2 rounded-md shadow hover:bg-ochra-600 transition font-poppins"
                                >
                                    Edit
                                </button>
                            )}
                            {role === 'ADMIN' && onDelete && (
                                <button
                                    onClick={() => { onDelete(article.id); fetchArticles(); }}
                                    className="m-2 bg-grey text-white px-4 py-2 rounded-md shadow hover:bg-black-700 transition font-poppins"
                                >
                                    Delete
                                </button>
                            )}
                        </li>
                    ))
                )}
            </ul>

            {/* Pagination component */}
            <div className="flex items-center justify-center mt-4">
                <button
                    className={`px-4 py-2 rounded-md border ${currentPage === 1 ? 'text-grey cursor-not-allowed' : 'text-black'}`}
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-left"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z"
                        />
                    </svg>
                </button>
                <span className="text-lg text-pink font-medium px-2 font-poppins">{currentPage}</span>
                <button
                    className={`px-4 py-2 rounded-md border ${currentPage >= totalPages ? 'text-grey cursor-not-allowed' : 'text-black'}`}
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage >= totalPages}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-chevron-right"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
};

export { ArticleList };
