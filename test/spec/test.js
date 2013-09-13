/*global describe, it */
'use strict';
(function () {
  describe('The To Do List', function(){
    this.timeout(15000);
    var result;
 

    var form = $('.form')
    
    var randomTask = 'A Test Task #'+ Math.floor(Math.random()*10000000)
    form.find('#task').val(randomTask)
    form.find('#content').val('This is a task')
 

    $('.save').click()
 
    it('should save a new task and that task should be returned from Parse', function(done){
      
 
      setTimeout((function(){
 
        var query = new Parse.Query(TaskClass);
        query.equalTo("task", randomTask);
        query.find({
          success: function(results) {
            result = results[0]
            console.log(results)
            expect(result.get('task')).to.equal(randomTask)
            done()
          },
          error: function(error) {
            done(error.description)
          }
        });
 
      }), 2000)
    });

    it("should post the new task to the sidebar for display purposes", function(){
    	var lastSideItem = $('.taskList li').last().text()
    	expect(lastSideItem).to.equal(randomTask)
    })

    // it("should place a clicked item from the sidebar into the form fields", function(done){
    	
    // 	var lastItem=$('.taskList li').last()

   		
   	// 	setTimeout((function(){
   	// 		lastItem.click()
   	// 		success: function() {
   	// 			var fieldTask = $('#task').text()
   	// 			expect(lastItem.text()).to.equal(fieldTask)
   	// 			done()
    // 		}

    // 		error: function(error) {
    // 			done(error.description)
    // 		}

    // 	}), 2000)
    // })
 
  })
})();

