import { Component, EventEmitter ,Output } from '@angular/core';
import { Post } from '../post.model';
import { NgForm } from '@angular/forms';
import { PostService } from '../posts.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.componet.html',
  styleUrls: ['./post-create.component.css']

})
export class PostCreateComponent{

  constructor(public postService : PostService){}

  onAddPost(form : NgForm){
    if(form.invalid){
      return;
      // alert("posted");
    }
    this.postService.setPost(form.value.title, form.value.content);
    form.resetForm();
  }
}
