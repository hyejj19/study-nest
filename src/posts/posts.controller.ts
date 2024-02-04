import {
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { PostsService } from './posts.service';

interface PostModel {
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

/**
 * GET /posts
 * 모든 post 를 다 가져온다.
 
 * GET /posts/:id
 * id 에 해당되는 post 르 가져온다.
 
 * POST /posts
 * post 를 생성한다.
 
 * PUT /posts/:id
 * id 에 해당하는 post 를 변경한다.
 
 * DELETE /posts/:id
 * id 에 해당하는 post 를 삭제한다.
 */

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return posts;
  }

  @Get(':id')
  getPost(@Param('id') postId: string): PostModel {
    const post = posts.find((post) => post.id === +postId);

    if (!post) {
      throw new NotFoundException();
    }

    return post;
  }

  @Post()
  create(@Body() postData: PostModel): PostModel {
    posts.push({
      id: posts.length + 1,
      ...postData,
    });

    return postData;
  }

  @Put()
  update(@Body() postData: PostModel): PostModel {
    const updatedPost = posts.map((post) =>
      post.id === postData.id ? postData : post,
    );

    posts = updatedPost;

    return postData;
  }

  @Delete(':id')
  delete(@Param('id') postId: string): PostModel[] {
    const deletedPosts = posts.filter((post) => post.id !== +postId);
    posts = deletedPosts;

    return deletedPosts;
  }
}
