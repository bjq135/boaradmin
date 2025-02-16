  <template>
  <el-breadcrumb separator="/">
    <el-breadcrumb-item :to="{ path: '/' }">后台首页</el-breadcrumb-item>
    <el-breadcrumb-item>文章管理</el-breadcrumb-item>
    <el-breadcrumb-item>新增文章</el-breadcrumb-item>
  </el-breadcrumb>

  <el-card>
    <template #header>
      <div class="card-header">
        <span>新增文章</span>
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
        <el-button @click="onSubmit">预览</el-button>
        <el-button type='danger' @click="onSubmit">删除</el-button>
      </el-form-item>
    </el-form>
  </el-card>

</template>


<script setup>
import { ref, reactive, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const router = useRouter()

import { ElMessage } from 'element-plus';
import fetchWrapper from '../../utils/fetch-wrapper.js';

const options = ref([]);

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
  tinymce.init({});
  await getCategories();
});

// do not use same name with ref
const form = reactive({
  title:'',
  description:'',
  categories:[],
  content:'',
  tags:'',
  is_show:'1'
})


async function getCategories(){
  var jsonHeaders = new Headers({ 'Content-Type':'application/json' });
  let url = 'http://127.0.0.1:3000/v1/categories';
  var response = await fetch(url, { method:'GET', headers:jsonHeaders });
  var responseJson = await response.json();
  if(response.status == 200){
    options.value = responseJson.map(i => {
      return {value:i.id, label:i.title};
    });
    form.categories.push(options.value[0].value)
  }else{

  }
}


const onSubmit = async () => {
  // ElMessage({ message:'开发中。。。', type:'error' });
  let url = 'http://127.0.0.1:3000/v1/articles/';
  let payload = JSON.stringify(form);
  let jsonHeaders = new Headers({'Content-Type':'application/json'});
  var response = await fetchWrapper(url, { method:'POST', headers:jsonHeaders, body:payload });
  var responseJson = await response.json();
  if(response.status == 201){
    let id = responseJson.id;
    ElMessage({ message:'添加成功，跳转中...', type:'success' });
    setTimeout(()=>{
      router.push('/admin/articles/'+id);
    },1000);
  }else{
    let error = responseJson.error ? responseJson.error : '修改失败';
    ElMessage({ message:error, type:'error' });
  }
}




</script>




