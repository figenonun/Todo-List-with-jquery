//JSON Dizi Yontemi
//todotitle
$(document).ready(
    function(){
    	var selected;
    	var maintodolist = [];
    	var subtodolist =[];
    	if(localStorage.getItem("maintodolist") === null){    		
    		localStorage.setItem("maintodolist",JSON.stringify(maintodolist));
    	}
    	else
    	{	
    		maintodolist = JSON.parse(localStorage.getItem("maintodolist"));
    		//$('#todotitle').text(maintodolist[0]);
    		for (index = 0, len = maintodolist.length; index < len; ++index) {
    			 $('#mainTodo').append('<li><div class="well"><input type="hidden"  class="hiddentext" value="'+ maintodolist[index]["index"] +'"/>' + maintodolist[index]["title"]  + '</div></li>');
    			
			}
    	}
        $('#button').click(
            function(){
                var toAdd = $('input[name=ListItem]').val();
               	var timeKey = Math.floor((new Date()).getTime() / 1000);
                 maintodolist.push({"index":'todo'+ timeKey ,"title":toAdd});
                 localStorage.setItem("maintodolist",JSON.stringify(maintodolist));      
                $('#mainTodo').append('<li><div class="well"><input type="hidden" class="hiddentext" value="todo'+timeKey+'"/>' + toAdd + '</div></li>');

            });       
       $("input[name=ListItem]").keyup(function(event){
          if(event.keyCode == 13){
            $("#button").click();
          }         
      });
      	
      	$('#subbutton').click(
            function(){
                var toAdd = $('input[name=subListItem]').val();
                 $('#subTodo').append('<li><div class="well">' + toAdd + '</div></li>');
                 subtodolist.push(toAdd);

                 localStorage.setItem(selected,JSON.stringify(subtodolist));      
                            	
            });      


      $(document).on('dblclick','#mainTodo  li', function(){
        $(this).toggleClass('strike').fadeOut('slow');  
        var index = maintodolist.indexOf($(this).text());
        if (index > -1) {
			maintodolist.splice(index, 1);
		}

		localStorage.setItem("maintodolist",JSON.stringify(maintodolist));
      });
      

      $(document).on('dblclick','#subTodo  li', function(){
        $(this).toggleClass('strike').fadeOut('slow');  
        var index = subtodolist.indexOf($(this).text());
        if (index > -1) {
			subtodolist.splice(index, 1);
		}

		localStorage.setItem(selected,JSON.stringify(subtodolist));
      });
      
      $('input').focus(function() {
        $(this).val('');

      });   
      
      $(document).on('click','#mainTodo li', function(){
      	$('#contenttodo').show();
    	$('#subTodo').empty();
      	selected = $(this).find("div").find("input").val();
        $('#todotitle').text($(this).text());
        if(JSON.parse(localStorage.getItem(selected)) !== null){
        subtodolist = JSON.parse(localStorage.getItem(selected));

        for (index = 0, len = subtodolist.length; index < len; ++index) {
    			 $('#subTodo').append('<li><div class="well">' + subtodolist[index]  + '</div></li>');
    	}
    }
   
      });

      	
    }
);
