Parse.initialize("T9FwiJMfIbPmrG65XR5x9TCDZPhFo59WvCx4RvBR", "FHRUtYc5Cc02z6oiHbejQPM7G2jvXavLjnX23Eel");

var TaskClass = Parse.Object.extend("Task");
 
var TaskCollectionClass = Parse.Collection.extend({
  model: TaskClass
});
 
var task = new TaskCollectionClass()

 
task.fetch({
  success: function(collection) {
    collection.each(function(task){
      addToSideBar(task)
    })
  }
})

$('.save').click(function(){
	console.log("saving")
  var task = new TaskClass();
  task.set('task', $('#task').val());
  task.set('content', $('#content').val());
  task.set('complete', false)
 
  task.save(null, {
    success: function(result){
      addToSideBar(result)
    },
    error: function(result, error){
      alert("Failure, "+ error.description)
    }
  })
})

 
function addToSideBar(task) {
  var li = $('<li>'+task.get('task')+'</li>')
  if (task.get('complete') == true ) {
  	li.css('color','green')
  	$('.taskList').append(li)
  }	
  else {
  	li.css('color', 'white')
  	$('.taskList').append(li)
  }
  li.click(function(){
    renderTask(task)
  })
}
 
function renderTask(task) {
  $('#task').val( task.get('task') )
  $('#content').val( task.get('content') )
  $('.delete').click(function(){
  		task.destroy({
  			success: function(task){

  				$('.taskList').html("")
   			 	collect = new TaskCollectionClass()
   				collect.fetch({
   					success: function(collection) {
     					collection.each(function(collect){
      		 			addToSideBar(collect)
     					})
   					}
	 			})
  				 
  			},
  			error: function(task, error){

  			}
  		})

	})
  $('.update').click(function(){
  	taskTitle = $('#task').val()
  	taskContent = $('#content').val()

  	task.save(null, {
  		success: function(task) {
    
   			task.set("task", taskTitle);
    		task.set("content", taskContent);
    		task.save();
    		$('.taskList').html("")
   			 collect = new TaskCollectionClass()
   				collect.fetch({
   					success: function(collection) {
     					collection.each(function(collect){
      		 			addToSideBar(collect)
     					})
   					}
	 			})
   		}
	});
  })
  $('.complete').click(function(){
  	
  	task.save(null, {
  		success: function(task) {
    
   			task.set("complete", true);
    		task.save();
    		$('.taskList').html("")
   			 collect = new TaskCollectionClass()
   				collect.fetch({
   					success: function(collection) {
     					collection.each(function(collect){
      		 			addToSideBar(collect)
     					})
   					}
	 			})
   		}
	});
  })
}
