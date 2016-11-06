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
        $postData=json_decode(file_get_contents('php://input'), TRUE);

        if(isset($postData['id']) && isset($postData['name']) && isset($postData['image'])
            && isset($postData['power']) && isset($postData['speed'])){

            $dataToSave=array(
                'id'=>$postData['id'],
                'name' => $postData['name'],
                'image' => $postData['image'],
                'power' => $postData['power'],
                'speed' => $postData['speed']);

            $addedItem=$this->model->create($dataToSave);
            $this->setResponce($addedItem);
        }
    }

    public function edit($data){

        $postData=json_decode(file_get_contents('php://input'), TRUE);

        if(isset($postData['id']) && isset($postData['name']) && isset($postData['image'])
            && isset($postData['power']) && isset($postData['speed'])){

            $dataToSave=array(
                'id'=>$postData['id'],
                'name' => $postData['name'],
                'image' => $postData['image'],
                'power' => $postData['power'],
                'speed' => $postData['speed']);

            $example = $this->model->save($data['id'], $dataToSave);
            $this->setResponce($example);
        }
    }

    public function delete($data) {
        $example = $this->model->delete($data['id']);
        $this->setResponce($example);
    }
}