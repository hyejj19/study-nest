import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { PostModel, PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postsService: PostsService) {}

  @Get()
  getPosts(): PostModel[] {
    return this.postsService.getAllPosts();
  }

  @Get(':id')
  getPost(@Param('id') id: string): PostModel {
    return this.postsService.getOnePost(id);
  }

  @Post()
  create(
    @Body('author') author: string,
    @Body('title') title: string,
    @Body('content') content: string,
  ): PostModel {
    return this.postsService.createPost(author, title, content);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body('author') author?: string,
    @Body('title') title?: string,
    @Body('content') content?: string,
  ): PostModel {
    return this.postsService.updatePost(id, author, title, content);
  }

  @Delete(':id')
  delete(@Param('id') id: string): string {
    this.postsService.deletePost(id);

    return id;
  }
}
