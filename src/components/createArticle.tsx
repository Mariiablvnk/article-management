import React, { useEffect } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Article } from '../lib/interfaces';

interface ArticleFormProps {
    article: Article | null;
    onSave: (article: Article) => void;
    onCancel: () => void;
}

const ArticleForm: React.FC<ArticleFormProps> = ({ article, onSave, onCancel }) => {
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm<Article>({
        defaultValues: {
            id: article?.id || '',
            title: article?.title || '',
            subtitle: article?.subtitle || '',
            content: article?.content || '',
            pubDate: article?.pubDate || new Date().toISOString(),
            createdAt: article?.createdAt || new Date().toISOString(),
            link: article?.link || '',
            image: article?.image || '',
            author: article?.author || '',
            enclosureUrl: article?.enclosureUrl || '',
            itunesTitle: article?.itunesTitle || '',
            itunesAuthor: article?.itunesAuthor || '',
            itunesImage: article?.itunesImage || '',
            itunesDuration: article?.itunesDuration || '',
            itunesSummary: article?.itunesSummary || '',
            itunesSubtitle: article?.itunesSubtitle || '',
            itunesExplicit: article?.itunesExplicit || false,
            itunesEpisodeType: article?.itunesEpisodeType || ''
        }
    });

    // Reset form values when article changes
    useEffect(() => {
        if (article) {
            reset({
                id: article.id,
                title: article.title,
                subtitle: article.subtitle,
                content: article.content,
                pubDate: article.pubDate,
                createdAt: article.createdAt,
                link: article.link,
                image: article.image,
                author: article.author,
                enclosureUrl: article.enclosureUrl,
                itunesTitle: article.itunesTitle,
                itunesAuthor: article.itunesAuthor,
                itunesImage: article.itunesImage,
                itunesDuration: article.itunesDuration,
                itunesSummary: article.itunesSummary,
                itunesSubtitle: article.itunesSubtitle,
                itunesExplicit: article.itunesExplicit,
                itunesEpisodeType: article.itunesEpisodeType
            });
        }
    }, [article, reset]);

    const onSubmit: SubmitHandler<Article> = (data) => {
        onSave(data);
    };

    return (
        <div className='fixed top-0 left-0 w-full h-full bg-grey bg-opacity-80 flex items-center justify-center'>
            <form
                className='bg-white p-6 rounded shadow-md max-w-lg w-full h-full overflow-y-auto'
                onSubmit={handleSubmit(onSubmit)}
            >
                <h2 className='text-xl font-bebas text-black mb-4'>
                    {article?.id ? 'Edit Article' : 'Create New Article'}
                </h2>

                <div className="mb-4">
                    <label htmlFor="title" className='block text-black font-poppins mb-2'>Title:</label>
                    <input
                        id="title"
                        type="text"
                        {...register('title', { required: 'Title is required' })}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                    {errors.title && <p className='text-red-500 text-sm mt-1'>{errors.title.message}</p>}
                </div>

                <div className='mb-4'>
                    <label htmlFor="subtitle" className='block text-black font-poppins mb-2'>Subtitle:</label>
                    <input
                        id="subtitle"
                        type="text"
                        {...register('subtitle')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="content" className='block text-black font-poppins mb-2'>Content:</label>
                    <textarea
                        id="content"
                        {...register('content')}
                        rows={4}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="pubDate" className='block text-black font-poppins mb-2'>Publication Date:</label>
                    <input
                        id="pubDate"
                        type="date"
                        {...register('pubDate')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="createdAt" className='block text-black font-poppins mb-2'>Created At:</label>
                    <input
                        id="createdAt"
                        type="date"
                        {...register('createdAt')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="link" className='block text-black font-poppins mb-2'>Link:</label>
                    <input
                        id="link"
                        type="url"
                        {...register('link')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="image" className='block text-black font-poppins mb-2'>Image URL:</label>
                    <input
                        id="image"
                        type="url"
                        {...register('image')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="author" className='block text-black font-poppins mb-2'>Author:</label>
                    <input
                        id="author"
                        type="text"
                        {...register('author')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="enclosureUrl" className='block text-black font-poppins mb-2'>Enclosure URL:</label>
                    <input
                        id="enclosureUrl"
                        type="url"
                        {...register('enclosureUrl')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesTitle" className='block text-black font-poppins mb-2'>iTunes Title:</label>
                    <input
                        id="itunesTitle"
                        type="text"
                        {...register('itunesTitle')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesAuthor" className='block text-black font-poppins mb-2'>iTunes Author:</label>
                    <input
                        id="itunesAuthor"
                        type="text"
                        {...register('itunesAuthor')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesImage" className='block text-black font-poppins mb-2'>iTunes Image URL:</label>
                    <input
                        id="itunesImage"
                        type="url"
                        {...register('itunesImage')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesDuration" className='block text-black font-poppins mb-2'>iTunes Duration:</label>
                    <input
                        id="itunesDuration"
                        type="text"
                        {...register('itunesDuration')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesSummary" className='block text-black font-poppins mb-2'>iTunes Summary:</label>
                    <textarea
                        id="itunesSummary"
                        {...register('itunesSummary')}
                        rows={2}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesSubtitle" className='block text-black font-poppins mb-2'>iTunes Subtitle:</label>
                    <input
                        id="itunesSubtitle"
                        type="text"
                        {...register('itunesSubtitle')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='mb-4 flex items-center'>
                    <input
                        id="itunesExplicit"
                        type="checkbox"
                        {...register('itunesExplicit')}
                        className='mr-2'
                    />
                    <label htmlFor="itunesExplicit" className='text-black font-poppins'>iTunes Explicit:</label>
                </div>

                <div className='mb-4'>
                    <label htmlFor="itunesEpisodeType" className='block text-black font-poppins mb-2'>iTunes Episode Type:</label>
                    <input
                        id="itunesEpisodeType"
                        type="text"
                        {...register('itunesEpisodeType')}
                        className="border-b-2 border-pink py-2 px-2 rounded-none focus:border-b-pink outline-none font-poppins w-full"
                    />
                </div>

                <div className='flex justify-end gap-2'>
                    <button type="submit" className='bg-pink text-black px-4 py-2 rounded font-poppins'>Save</button>
                    <button type="button" onClick={onCancel} className='bg-grey text-white px-4 py-2 rounded font-poppins'>Cancel</button>
                </div>
            </form>
        </div>
    );
};

export default ArticleForm;
