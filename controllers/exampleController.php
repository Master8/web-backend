<?php

class exampleController extends Controller {

	public function index(){
		$examples=$this->model->load();		// просим у модели все записи
		$this->setResponce($examples);		// возвращаем ответ 
	}

	public function view($data){
		$example=$this->model->load($data['id']); // просим у модели конкретную запись
		$this->setResponce($example);
	}

	public function add(){
		if(isset($_POST['title'])){
			// мы передаем в модель массив с данными
			// модель должна вернуть boolean
			$dataToSave=array('title'=>$_POST['title']);
			$addedItem=$this->model->create($dataToSave);
			$this->setResponce($addedItem);
		}
	}

	public function edit($data){

        parse_str(file_get_contents("php://input"),$post_vars);

	    if(isset($post_vars['title'])){

            $dataToSave=array('title'=>$post_vars['title']);
            $example = $this->model->save($data['id'], $dataToSave);
            $this->setResponce($example);
        }
	}

	public function delete($data) {
        $example = $this->model->delete($data['id']);
        $this->setResponce($example);
    }

}