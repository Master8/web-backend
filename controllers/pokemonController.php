<?php

class pokemonController extends Controller
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
        if(isset($_POST['id']) && isset($_POST['name']) && isset($_POST['image'])
            && isset($_POST['power']) && isset($_POST['speed'])){

            $dataToSave=array(
                'id'=>$_POST['id'],
                'name' => $_POST['name'],
                'image' => $_POST['image'],
                'power' => $_POST['power'],
                'speed' => $_POST['speed']);

            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }

    public function edit($data){

        parse_str(file_get_contents("php://input"),$post_vars);

        if(isset($post_vars['id']) && isset($post_vars['name']) && isset($post_vars['image'])
            && isset($post_vars['power']) && isset($post_vars['speed'])){

            $dataToSave=array(
                'id'=>$post_vars['id'],
                'name' => $post_vars['name'],
                'image' => $post_vars['image'],
                'power' => $post_vars['power'],
                'speed' => $post_vars['speed']);

            $example = $this->model->save($data['id'], $dataToSave);
            $this->setResponce($example);
        }
    }

    public function delete($data) {
        $example = $this->model->delete($data['id']);
        $this->setResponce($example);
    }
}