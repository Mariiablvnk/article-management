export interface Action {
    name: string;
    to: string;
    list?: string[];
}

export interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
}

export interface ArticleContextType {
    article: Article | null;
    setArticle: (article: Article | null) => void;
}

export interface Article {
    enclosureUrl: string;
    itunesTitle: string;
    itunesAuthor: string;
    itunesImage: string;
    itunesDuration: string;
    itunesSummary: string;
    itunesSubtitle: string;
    itunesExplicit: any;
    itunesEpisodeType: string;
    image: string | undefined;
    content: String;
    pubDate: string | number | Date;
    link: string | undefined;
    id: string;
    title: string;
    subtitle?: string;
    createdAt: string;
    author: string;
}
export interface ArticleContextType {
    article: Article | null;
    setArticle: (article: Article | null) => void;
}

export interface ArticleListProps {
    onDelete?: (id: string) => void;
    onEdit?: (article: Article) => void;
    userRole?: string
}

export interface ModalProps {
    message: string;
    type: 'success' | 'error';
    onClose: () => void;
}
export interface RSSItem {
    guid: {
        [x: string]: any; $: { isPermaLink: string }
    }[];
    title: string[];
    description: string[];
    pubDate: string[];
    author: string[];
    link: string[];
    'content:encoded': string[];
    enclosure: { $: { url: string; length: string; type: string } }[];
    'itunes:title': string[];
    'itunes:author': string[];
    'itunes:image': { $: { href: string } }[];
    'itunes:duration': string[];
    'itunes:summary': string[];
    'itunes:subtitle': string[];
    'itunes:explicit': string[];
    'itunes:episodeType': string[];
}


export interface ArticleFormProps {
    article?: Article;
    onSave: (article: Article) => void;
    onCancel: () => void;
}


export interface CustomFileUploadProps {
    label: string;
    onFileChange: (file: File | null) => void;
}