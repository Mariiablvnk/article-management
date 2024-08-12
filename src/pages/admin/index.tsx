import { useAuth } from '@clerk/nextjs';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Article } from '../../lib/interfaces';
import axios from 'axios';
import ArticleForm from '../../components/createArticle';
import SkeletonArticle from '../../components/sceletonArticle';
import { ArticleList } from '../../components/articlesList';
import Modal from '../../components/Modal';

export default function AdminPage() {
  const { userId, isLoaded } = useAuth();
  const [user, setUser] = useState(null);
  const router = useRouter();
  const [selectedArticle, setSelectedArticle] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [modalMessage, setModalMessage] = useState<string | null>(null);
  const [modalType, setModalType] = useState<'success' | 'error' | null>(null);

  useEffect(() => {
    if (isLoaded && userId) {
      fetch(`/api/authentication`)
        .then(async (res) => {
          const data = await res.json();
          setUser(data.db_user);
          if (data.db_user.role !== 'ADMIN') {
            router.push('/');
          } else {
            setLoading(false); 
          }
        })
        .catch((error) => {
          console.error('Error fetching user:', error);
          setLoading(false); 
        });
    }
  }, [userId, isLoaded, router]);

  const handleEdit = (article: Article) => {
    setShowForm(true);
    setSelectedArticle(article);
  };

  const handleCancel = () => {
    setShowForm(false);
    setSelectedArticle(null);
  };

  const handleDelete = async (id: string) => {
    try {
      await axios.delete(`/api/articles/${id}`);
      setModalMessage('Article deleted successfully.');
      setModalType('success');
    } catch (error) {
      console.error('Error deleting article:', error);
      setModalMessage('Error deleting article.');
      setModalType('error');
    }
  };

  const handleSave = async (article: Article) => {
    try {
      if (article.id) {
        await axios.patch(`/api/articles/${article.id}`, article);
      } else {
        await axios.post('/api/articles/create', article);
      }
      setSelectedArticle(null);
      setShowForm(false);
      setModalMessage('Article saved successfully.');
      setModalType('success');

    } catch (error) {
      console.error('Error saving article:', error);
      setModalMessage('Error saving article.');
      setModalType('error');
    }
  };

  const handleCloseModal = () => {
    setModalMessage(null);
    setModalType(null);
    router.reload()
  };

  if (loading) {
    return <SkeletonArticle />;
  }

  return (
    <div>
      <div className='flex flex-row justify-start w-full'>
        <h1 className='font-cactus text-[50px] w-full text-center'>Admin Dashboard</h1>
        
      </div>
      <button className='text-pink w-full justify-self-end text-center font-medium  md:text-3xl p-0 m-0 whitespace-nowrap font-bebas' onClick={() => { setSelectedArticle(null); setShowForm(true); }}>
          Add  New
        </button>
      <ArticleList userRole='ADMIN' onEdit={handleEdit} onDelete={handleDelete} />

      {showForm && (
        <ArticleForm
          article={selectedArticle || null}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}

      {modalMessage && modalType && (
        <Modal
          message={modalMessage}
          type={modalType}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
