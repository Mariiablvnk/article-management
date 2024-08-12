import React, { useEffect, useState } from 'react';
import { useArticle } from '../../context/articleProvider';
import SkeletonArticle from '../../components/sceletonArticle';

const ArticlePage: React.FC = () => {
    const [loading, setLoading] = useState(true);
    const { article } = useArticle();

    useEffect(() => {
        if (article) {
            setLoading(false);
        }
    }, [article]);

    if (loading) {
        return <SkeletonArticle />;
    }

    if (!article) {
        return <p className="text-red-600 font-bold text-center">Article not found</p>;
    }

    function removeHtmlTags(text: string): string {
        return text.replace(/<[^>]*>/g, '');
    }

    function replaceLinksWithAnchorTags(text: string): string {
        const urlRegex: RegExp = /(\b(https?|ftp|file):\/\/[-A-Z0-9+&@#\/%?=~_|!:,.;]*[-A-Z0-9+&@#\/%=~_|])/ig;
        return text.replace(urlRegex, (url: string) => {
            return `<a href="${url}" target="_blank" rel="noopener noreferrer" class="text-pink-600 hover:underline"> LINK. </a>`;
        });
    }

    function processText(text: string): string {
        const cleanedText: string = removeHtmlTags(text);
        return replaceLinksWithAnchorTags(cleanedText);
    }

    const imageUrl = article.itunesImage && Array.isArray(article.itunesImage) && article.itunesImage.length > 0
        ? article.itunesImage[0]?.href
        : article.image;

    return (
        <div className="p-6 max-w-3xl mx-auto">
            <div className="">
                <div className="w-full font-poppins flex md:flex-row flex-col justify-center md:gap-16 md:justify-between">
                    <img
                        src={imageUrl}
                        alt={article.title}
                        className="w-full max-w-[300px] h-auto rounded-lg shadow-lg"
                    />
                    <div className="mt-4 mr-4 flex flex-col justify-start items-end">
                        <h1 className="text-3xl text-right font-bold text-green-600 mt-4">{article.title}</h1>
                        <button
                            className="bg-green text-white px-4 py-2 my-4 rounded-lg hover:opacity-50 transition"
                            onClick={() => window.open(article.link, '_blank')}
                        >
                            Read more
                        </button>
                    </div>
                </div>
                <p className="text-gray-900 mt-6"><span className="font-bold text-pink-600">Author:</span> {article.author}</p>
                <p className="text-gray-900 mt-2"><span className="font-bold text-pink-600">Published:</span> {new Date(article.pubDate).toLocaleDateString()}</p>

                <p className="text-gray-500 mt-4 leading-relaxed" dangerouslySetInnerHTML={//@ts-ignore
                    { __html: processText(article.subtitle) }} />
                <p className="text-gray-700 mt-4 leading-relaxed" dangerouslySetInnerHTML={//@ts-ignore
                    { __html: processText(article.content) }} />

                <div className="mt-6 font-poppins">
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">Enclosure:</span>
                        <span className="text-gray-600"><a href={article.enclosureUrl} className="text-pink-600 hover:underline" target="_blank" rel="noopener noreferrer"> URL </a></span>
                    </p>
                    <p className="text-gray-900 mt-2 flex md:flex-row">
                        <span className="font-bold text-pink-600">iTunes Title:</span> {article.itunesTitle}
                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">iTunes Author:</span> {article.itunesAuthor}
                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">iTunes Explicit:</span> {article.itunesExplicit ? 'Yes' : 'No'}
                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">iTunes Episode Type:</span> {article.itunesEpisodeType}
                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600" >iTunes Image:</span>
                        <span className="text-gray-700 mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processText(imageUrl) }} ></span>

                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">iTunes Duration:</span> {article.itunesDuration}
                    </p>
                    <p className="text-gray-900 mt-6">
                        <span className="font-bold text-pink-600">iTunes Summary:</span>
                        <span className="text-gray-700 mt-4 text-base leading-relaxed" dangerouslySetInnerHTML={{ __html: processText(article.itunesSummary) }} ></span>

                    </p>
                    <p className="text-gray-900 mt-2">
                        <span className="font-bold text-pink-600">iTunes Subtitle:</span>
                        <span className="text-gray-700 text-base mt-4 leading-relaxed" dangerouslySetInnerHTML={{ __html: processText(article.itunesSubtitle) }} ></span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default ArticlePage;
