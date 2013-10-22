//CALL BELOW FUNCTION AT onsubmit of contact us form
    function fnSave(){
        //$("#btnSubmit").val("Sending...");
        //$('#btnSubmit').attr("disabled", true);
        //update textbox id of name
       var myName = $("#firstname").val() + " " + $("#lastname").val();
        //update textbox id of mobile
       var myMobile = $("#mobilenumber").val();
        //update textbox id of email
        var myEmail=$("#email").val();
        //update textbox id of address
        var myAddress = $("#Streetaddress").val();
        //update url of form
        var myReferenceURL="Lavasa";
        var Data="";
       var URL="http://www.samsaninternational.com/webformsubmit.php";
       // var URL="http://localhost/samsan/webformsubmit.php";
        if(myEmail!=""){
            Data="Name="+(myName)+"&Mobile="+(myMobile)+"&Email="+(myEmail)+"&Address="+(myAddress)+"&ReferenceURL="+(myReferenceURL);
          document.getElementById('remotePage').onload = function()
                {
                    //alert('done, going to submit');
                    //$('#myForm').submit();	
                }
                //alert(URL + "?" + Data);
				document.getElementById("remotePage").src=URL+"?"+Data;
          //return false;

        }
         setTimeout(submitForm, 5000)
        //return false;
    }
    function submitForm(){
    $('#myForm').submit();
    }
/*-----------------------------------------------------*/

        $(function () {
            var name = $("#name"),
            email = $("#email"),
            mobile = $("#mobile"),
            requirement = $("#requirement"),
            allFields = $([]).add(name).add(email).add(mobile).add(requirement),
            tips = $(".validateTips");

            function updateTips(t) {
                tips
                .text(t)
                .addClass("ui-state-highlight");
                setTimeout(function () {
                    tips.removeClass("ui-state-highlight", 1500);
                }, 500);
            }

            function checkLength(o, n, min, max) {
                if (o.val().length > max || o.val().length < min) {
                    o.addClass("ui-state-error");
                    updateTips("Length of " + n + " must be between " +
                    min + " and " + max + ".");
                    return false;
                } else {
                    return true;
                }
            }

            function checkRegexp(o, regexp, n) {
                if (!(regexp.test(o.val()))) {
                    o.addClass("ui-state-error");
                    updateTips(n);
                    return false;
                } else {
                    return true;
                }
            }

            $("#dialog-form").dialog({
                autoOpen: false,
                height: 455,
                width: 350,
                modal: true,
                buttons: {
                    "Submit": function () {
                    	
                        var bValid = true;
                        allFields.removeClass("ui-state-error");

                        bValid = bValid && checkLength(name, "name", 3, 30);
                        bValid = bValid && checkLength(email, "email", 6, 80);
                        bValid = bValid && checkLength(mobile, "mobile", 10, 13);
                        bValid = bValid && checkLength(requirement, "requirement", 10, 300);

                        bValid = bValid && checkRegexp(name, /^[a-z]([a-z ])+$/i, "Name may consist of a-z, space, begin with a letter.");
                        // From jquery.validate.js (by joern), contributed by Scott Gonzalez: http://projects.scottsplayground.com/email_address_validation/
                        bValid = bValid && checkRegexp(email, /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i, "eg. ui@jquery.com");
                        bValid = bValid && checkRegexp(mobile, /^([0-9+])+$/, "Mobile field only allow : 0-9, and + symbol with 10-13 digits");

                        if (bValid) {
                            
                           updateTips("Mail sending in process...Please wait"); 
                        	 fnSave_mailsend();
                        	 //alert("save complete. send mail");


                            $.post("mailsend.php", { name: $("#name").val(), mobile: $("#mobile").val(), email:$("#email").val(), requirement:$("#requirement").val()  },
   		function(data) {
     		alert("Thank you for the details. Our Travel Executive will get back to you shortly.\n\nRegards\nResponse Department\nSam-San Travels");
     		//close dialog
     		updateTips("");
     		$("#dialog-form").dialog("close");

   		});
                        }
                    },
                    Cancel: function () {
                        $(this).dialog("close");
                    }
                },
                close: function () {
                    allFields.val("").removeClass("ui-state-error");
                }
            });

            $("#mail-popup")
            .click(function () {
                $("#dialog-form").dialog("open");
            });
        });
/*--------------------------------------------------------------------------*/
 function fnSave_mailsend(){
		
       var myName=$("#name").val();
      
        var myMobile=$("#mobile").val();
      
        var myEmail=$("#email").val();
        
        var myRequirement=$("#requirement").val();
        
        var myReferenceURL="www.hotelsinlavasa.com/Popup";
        var Data="";
        var URL="http://www.samsaninternational.com/webformsubmit.php";
      
        if(myEmail!=""){
            Data="Name="+(myName)+"&Mobile="+(myMobile)+"&Email="+(myEmail)+"&Address="+(myRequirement)+"&ReferenceURL="+(myReferenceURL);
			// alert(Data);
            document.getElementById('remotePage').onload = function()
                {
                    //alert('done, going to submit');
                   // $('#myForm').submit();
                }
            document.getElementById("remotePage").src=URL+"?"+Data;
          //return false;

        }
         //setTimeout(submitForm, 3000)
        //return false;
        
        

    }

/*---------------------------------------------------------------*/