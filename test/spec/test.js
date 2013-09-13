/*global describe, it */
'use strict';
(function () {
  describe('The To Do List', function(){
    this.timeout(15000);
 
    it('should save a new task and that task should be returned from Parse', function(done){
      var result;
 
      // fill out the form
      var form = $('.form')
      // make a random title with which we can query
      var randomTask = 'A Test Task #'+ Math.floor(Math.random()*10000000)
      form.find('#task').val(randomTask)
      form.find('#content').val('This is a really great post! I loved writing it!')
 
      // submit it
      $('.save').click()
 
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
    }); // end it()
 
  })
})();