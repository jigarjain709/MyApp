import { Post } from './post.model';
import { Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core';

@Injectable({ providedIn : "root" })
export class PostService{
  private posts : Post[] = [];
  private updatedPost = new Subject<Post[]>();
  constructor(private http: HttpClient){}


  getPost(){
    this.http.get<{message ; string, posts : Post[]}>('http://localhost:3000/api/posts')
      .subscribe((getPosts)=> {
        this.posts = getPosts.posts;
        this.updatedPost.next([...this.posts]);
      });
  }

  getpostSubscription(){
    return this.updatedPost.asObservable();
  }


  setPost(title : string, content : string){
    const post : Post = {_id : null ,title : title, content : content};
    this.http.post<{message : string}>('http://localhost:3000/api/posts', post)
      .subscribe(responseMessage => {
        console.log(responseMessage.message);
        this.posts.push(post);
        this.updatedPost.next([...this.posts]);
      });

  }

  deletePost(postId : string){
    console.log('deleting...')
    this.http.delete("http://localhost:3000/api/posts/"+postId)
      .subscribe(()=>{
        console.log("Deleted");
      })
  }
}
