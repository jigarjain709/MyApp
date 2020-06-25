import { Component, OnInit, OnDestroy } from '@angular/core';
import { Post } from '../post.model';
import { PostService } from '../posts.service';
import { Subscription } from 'rxjs'


@Component({
  selector : 'app-post-list',
  templateUrl : './post-list.component.html',
  styleUrls : ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy{

  posts : Post[] = [];
  private postSub : Subscription;
  constructor(public postService : PostService){}

  ngOnInit(){
    this.postService.getPost();
    this.postSub = this.postService.getpostSubscription().subscribe((fposts: Post[]) => {
      this.posts =fposts;
    });
  }

  onDelete(postId : string){
    this.postService.deletePost(postId);
  }

  ngOnDestroy(){
    this.postSub.unsubscribe();
  }

}
