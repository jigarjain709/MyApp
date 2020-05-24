import { Post } from './post.model';
import { Subject } from 'rxjs'
export class PostService{
  private posts : Post[] = [];
  private updatedPost = new Subject<Post[]>();

  getPost(){
    return [...this.posts];
  }
  getpostSubscription(){
    return this.updatedPost.asObservable();
  }
  setPost(title : string, content : string){
    const post : Post = {title : title, content : content};
    this.posts.push(post);
    this.updatedPost.next([...this.posts]);
  }
}
