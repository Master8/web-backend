<?php

class userController extends Controller
{
    public function index(){
        $examples=$this->model->load();
        $this->setResponce($examples);
    }

    public function view($data){
        $example=$this->model->load($data['id']);
        $this->setResponce($example);
    }

    public function add(){
        if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['score'])){

            $dataToSave=array(
                'id'=>$_POST['id'],
                'name' => $_POST['name'],
                'score' => $_POST['score']);

            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }

    public function edit($data){

        parse_str(file_get_contents("php://input"),$post_vars);

        if(isset($post_vars['id']) && isset($post_vars['name']) && isset($post_vars['score'])){

            $dataToSave=array(
                'id'=>$post_vars['id'],
                'name' => $post_vars['name'],
                'score' => $post_vars['score']);

            $example = $this->model->save($data['id'], $dataToSave);
            $this->setResponce($example);
        }
    }

    public function delete($data) {
        $example = $this->model->delete($data['id']);
        $this->setResponce($example);
    }
}