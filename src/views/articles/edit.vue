  <template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>编辑文章</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <template #header>
      <div class="card-header">
        <span>编辑文章</span>
      </div>
    </template>
    
    <el-form :model="form" label-width="auto" style="max-width: 600px">
      <el-form-item label="标题">
        <el-input v-model="form.title" />
      </el-form-item>

      <el-form-item label="描述">
        <el-input v-model="form.description" type="textarea" />
      </el-form-item>

      <el-form-item label="分类">
        <el-select
          v-model="form.categories"
          multiple
          clearable
          placeholder="Select"
          style="width: 240px"
        >
          <el-option
            v-for="item in options"
            :key="item.value"
            :label="item.label"
            :value="item.value"
          />
        </el-select>
      </el-form-item>

      <el-form-item label="内容" style="width:900px">
        <editor v-model="form.content" :init="init" ></editor>
      </el-form-item>

      <el-form-item label="状态">
        <el-radio-group v-model="form.is_show">
          <el-radio value="1">显示</el-radio>
          <el-radio value="0">隐藏</el-radio>
        </el-radio-group>
      </el-form-item>
      
      <el-form-item>
        <el-button type="primary" @click="onSubmit">保存</el-button>
        <el-button>预览</el-button>
        <el-button type='danger'>删除</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>


<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

import { ElMessage } from 'element-plus';
import fetchWrapper from '../../utils/fetch-wrapper.js';

const options = ref([]);
// const router = useRouter();
// console.log('router.params.id ', router);

const route = useRoute();
const articleId = route.params.id;

// import myEditor from '../../components/myEditor.vue';

import tinymce from 'tinymce/tinymce'
import 'tinymce/themes/silver'
import Editor from '@tinymce/tinymce-vue'
import 'tinymce/icons/default'
import 'tinymce/models/dom'

import 'tinymce/plugins/link'
import 'tinymce/plugins/code'
import 'tinymce/plugins/codesample'
import 'tinymce/plugins/image'
import 'tinymce/plugins/media'
import 'tinymce/plugins/table'
import 'tinymce/plugins/lists'
import 'tinymce/plugins/wordcount'


const example_image_upload_handler = (blobInfo, progress) => new Promise((resolve, reject) => {
  var formData = new FormData();
  formData.append('file', blobInfo.blob(), blobInfo.filename());

  fetchWrapper('http://127.0.0.1:3000/v1/upload?original=true',{
    method: 'POST',
    // headers: {"Content-type": "multipart/form-data; charset=UTF-8"},
    headers: new Headers(),
    body: formData
  })
  .then(response => response.json())
  .then(json => {
    console.log('222', json)
    resolve(json.url);
  })
  .catch(err => {
    console.log('@@ err', err);
    reject('sss: '+err);
  }); 
});


const init = {
  language_url: '/tinymce/zh_CN.js',
  language: 'zh_CN',
  width: '100%',
  height: 500,
  resize: true,
  skin_url: '/tinymce/skins/ui/oxide',
  content_css: `/tinymce/skins/content/default/content.css`,
  plugins:  'link lists image code codesample table wordcount',
  toolbar: 'undo redo | styles | bold italic | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link image media | ' +
      'forecolor backcolor emoticons | codesample | removeformat code  fullscreen help',
  toolbar_mode : 'wrap',
  branding: false, 
  menubar: false, 
  images_upload_handler: example_image_upload_handler,
  image_dimensions: false,
  codesample_languages: [
        { text: "HTML/XML", value: "markup" },
        { text: "JavaScript", value: "javascript" },
        { text: "CSS", value: "css" },
        { text: "PHP", value: "php" },
        { text: "Ruby", value: "ruby" },
        { text: "Python", value: "python" },
        { text: "Java", value: "java" },
        { text: "C", value: "c" },
        { text: "C#", value: "csharp" },
        { text: "C++", value: "cpp" },
      ],
  style_formats: [
        { title: 'Paragraph', format: 'p' },
        { title: 'Header 1', format: 'h1' },
        { title: 'Header 2', format: 'h2' },
        { title: 'Header 3', format: 'h3' },
        { title: 'Header 4', format: 'h4' },
        { title: 'Header 5', format: 'h5' },
        // { title: 'Preformatted', format: 'pre' }
        {
          title: '代码', 
          block: 'pre',
          classes: [ 'language-javascript' ],
          attributes:{contenteditable:"true", "data-mce-highlighted":"true"}
        }
    ],
  highlight_on_focus: false,
  license_key: 'gpl',
};

onMounted(async function(e){
  // console.log('mounted...');
  tinymce.init({});

  const article = await getArticle(articleId);
  console.log('article ', article.is_show);
  form.title = article.title;
  form.description = article.description;
  form.content = article.content;
  form.categories = article.categories;
  form.categories = article.categories;
  form.is_show = String(article.is_show);
});

// do not use same name with ref
const form = reactive({
  title:'',
  description:'',
  categories:'',
  content:'',
  tags:'',
  // is_show:'1'
})

async function getArticle(articleId){
  var jsonHeaders = new Headers({ 'Content-Type':'application/json' });
  let url = 'http://127.0.0.1:3000/v1/articles/' + articleId;
  var response = await fetch(url, { method:'GET', headers:jsonHeaders });
  var responseJson = await response.json();
  if(response.status == 200){
    // console.log('json1: ',  responseJson.all_categories);
    options.value = responseJson.all_categories.map(i => {
      return {value:i.id, label:i.title};
    });
    return responseJson;
  }else{
    let error = responseJson.error ? responseJson.error : '登录失败';
    ElMessage({ message:error, type:'error' });
  }
}


const onSubmit = async () => {
  let url = 'http://127.0.0.1:3000/v1/articles/' + articleId;
  let payload = JSON.stringify(form);
  let jsonHeaders = new Headers({'Content-Type':'application/json'});
  var response = await fetchWrapper(url, { method:'PUT', headers:jsonHeaders, body:payload });
  var responseJson = await response.json();
  if(response.status == 200){
    console.log('response', response)
    ElMessage({ message:'修改成功', type:'success' });
  }else{
    let error = responseJson.error ? responseJson.error : '修改失败';
    ElMessage({ message:error, type:'error' });
  }
}

// const onSubmit = async () => {
//   console.log('@form@', JSON.stringify(form));

//   let jsonHeaders = new Headers({
//     'Content-Type':'application/json',
//     'Authorization':'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE3Mzk1NTkyMjcsImlhdCI6MTczOTUxNTk5NywiZGF0YSI6eyJpZCI6MX19.JFF38oKjzXxcHMfMQxN4k-axsP111idLXDNTc8SsE08'
//   });
//   let url = 'http://127.0.0.1:3000/v1/articles/' + articleId;
//   // let payload = {'title':'sssss'};
//   let payload = JSON.stringify(form);
//   var response = await fetch(url, { method:'PUT', headers:jsonHeaders, body:payload });
//   var responseJson = await response.json();
//   if(response.status == 200){
//     console.log('response', response)
//     ElMessage({ message:'修改成功', type:'success' });
//   }else{
//     let error = responseJson.error ? responseJson.error : '修改失败';
//     ElMessage({ message:error, type:'error' });
//   }
// }



</script>




