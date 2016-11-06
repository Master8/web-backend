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
        $postData=json_decode(file_get_contents('php://input'), TRUE);

        if(isset($postData['id']) && isset($postData['name']) && isset($postData['score'])){

            $dataToSave=array(
                'id'=>$postData['id'],
                'name' => $postData['name'],
                'score' => $postData['score']);

            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }

    public function edit($data){

        $postData=json_decode(file_get_contents('php://input'), TRUE);

        if(isset($postData['id']) && isset($postData['name']) && isset($postData['score'])){

            $dataToSave=array(
                'id'=>$postData['id'],
                'name' => $postData['name'],
                'score' => $postData['score']);

            $example = $this->model->save($data['id'], $dataToSave);
            $this->setResponce($example);
        }
    }

    public function delete($data) {
        $example = $this->model->delete($data['id']);
        $this->setResponce($example);
    }
}