import { Injectable, NotFoundException } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PostsModel } from './entities/post.entity';
import { InjectRepository } from '@nestjs/typeorm';

export interface PostModel {
  id: number;
  author: string;
  title: string;
  content: string;
  likeCount: number;
  commentCount: number;
}

let posts: PostModel[] = [
  {
    id: 1,
    author: 'newjeans_official',
    title: '뉴진스 민지',
    content: '민지는 예쁘다',
    likeCount: 10000000,
    commentCount: 99999,
  },
  {
    id: 2,
    author: 'newjeans_official',
    title: '해린',
    content: '해린은 이쁘다',
    likeCount: 10000000,
    commentCount: 99999,
  },
  {
    id: 3,
    author: 'newjeans_official',
    title: '다니엘',
    content: '다니엘은 이쁘다',
    likeCount: 10000000,
    commentCount: 99999,
  },
];

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(PostsModel)
    private readonly postsRepository: Repository<PostsModel>,
  ) {}

  getAllPosts(): PostModel[] {
    return posts;
  }

  getOnePost(postId: number): PostModel {
    const post = posts.find((post) => post.id === postId);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  createPost(author: string, title: string, content: string): PostModel {
    const newPost: PostModel = {
      id: posts.length + 1,
      author,
      title,
      content,
      commentCount: 0,
      likeCount: 0,
    };

    posts.push(newPost);

    return newPost;
  }

  updatePost(
    id: number,
    author?: string,
    title?: string,
    content?: string,
  ): PostModel {
    const post = this.getOnePost(id);

    if (author) {
      post.author = author;
    }
    if (title) {
      post.title = title;
    }
    if (content) {
      post.content = content;
    }

    posts = posts.map((prev) => (prev.id === +id ? post : prev));

    return post;
  }

  deletePost(id: number): number {
    this.getOnePost(id);

    const deletedPosts = posts.filter((post) => post.id !== +id);
    posts = deletedPosts;

    return id;
  }
}
