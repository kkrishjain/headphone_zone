
/****PLEASE DON'T MAKE CHANGES IN THIS FILE IT'S AFFECT THE CODE IF YOU NEED ANY HELP PLEASE CONTACT TO FLITS TEAM support@getflits.com ****/
(function(Flits) {
  /* To load js in all pages */
  if(Flits.Metafields.IS_SOCIAL_LOGIN_PAID && Flits.Metafields.IS_SOCIAL_LOGIN_ENABLE){
    if(window.flitsObjects.allCssJs.socialLoginJs){
        Flits.LoadStyleScript('socialLoginJs',window.flitsObjects.allCssJs.socialLoginJs.url);
    }
  }
  
  Flits(document).on('click','.flits-custom-warranty-button',function(event){
    // event.preventDefault();
    // Flits(this).siblings('navigation-drawer').attr('id', 'warranty');
    // Flits(this)[0].click();
    let id = Flits(this).attr('aria-controls');
    Flits('body > navigation-drawer#'+id+'').not(':last').remove(); 
  });


    Flits(document).on('toggle', function(event){
      if (window.location.pathname == '/account') {
       Flits('body').parent().removeClass('lock'); 
      }
    });
 
  
  Flits(document).on('Flits:SocialLoginAutomaticCode:Loaded', function(event){

    var data = event.detail;

    var el = data.el;
    var parent = data.parent; // parent
    var cloneNode = data.cloneNode; // cloned social login div
    var socialLoginTitle = '<div class="social-login-title"> <span>login with social or</span></div>';
    cloneNode.append(socialLoginTitle);

    parent.prepend(cloneNode);
    setTimeout(function(){
      if(window.location.pathname == '/account/register'){
      	Flits(".shopify-section--main-customers-register .flits-social-login-container").insertAfter(".shopify-section--main-customers-register .page-header .page-header__text-wrapper h1");
      }
      else{
        Flits("#login-form-container .flits-social-login-container").insertAfter("#login-form-container .page-header .page-header__text-wrapper h1");
      }
    }, 1000);
  });
  
   
  Flits(document).on('Flits:Navigation:Loaded', function(event){
    
    //Note : Merchant has asking to not show wishlist tab in account page.
    var settings = event.detail.settings;
    var listToDelete = ['My Wishlist', 'Log Out'];
    for (var i = 0; i < settings.navs.length; i++) {
      var obj = settings.navs[i];
      if (listToDelete.indexOf(obj.title) !== -1) {
        settings.navs.splice(i, 1);
        i--;
      }
    }
    var obj = {
      title: 'Club Audiophile Rewards',
      url:'#club-audiophile-rewards',
      target:0,
      badge: null,
      icon: null,
      isShow: 1,
      loader:null,
      body_html: '<div class="nector_reward_tab"></div>'
    };
    
    settings.navs.splice(2, 0, obj);
    
    // var contactUs = {
    //   title: 'Contact US',
    //   url:'#contactUs',
    //   target:0,
    //   badge: null,
    //   icon: null,
    //   isShow: 1,
    //   loader:null,
    //   body_html: '<div class="headphone-zone-contact-us-main"></div>'
    // };
    
    // settings.navs.splice(4, 0, contactUs);
    
    setTimeout(function(){
      var customContactInfo = Flits('.headphone-zone-contact-us-body').clone();
      Flits('.headphone-zone-contact-us-main').html(customContactInfo);
      Flits('.headphone-zone-contact-us-main .headphone-zone-contact-us-body').show();
    }, 3000);
    
  });
  Flits(document).on('click', '.flits-profile-edit-button', function(event){
  	Flits('.flits-profile-logout-btn').hide();
  });
  Flits(document).on('click', '.flits-profile-cancel-button', function(event){
  	Flits('.flits-profile-logout-btn').show();
  });
  Flits(document).on('Flits:myProfile:Updated', function(){
  	Flits('.flits-profile-logout-btn').show();
  });
  function flitsCustomIntregation(){
  	// var lion_integrated_page = Flits(".flits-custom-lion-page").children().children();
    var nector_integrated_page = Flits(".nector_flits").children();
    if(Flits("#flits_tab_club-audiophile-rewards").find(".nector_reward_tab").children().length > 0){}
    else{
     Flits("#flits_tab_club-audiophile-rewards").find(".nector_reward_tab").append(nector_integrated_page); 
    }
    // Flits(".flits-custom-lion-page").remove();
    
  }
  Flits(document).on('Flits:AccountPage:Loaded', function(event){
    setTimeout(function(){
      flitsCustomIntregation();
    }, 1400);
  });
  
  Flits(document).on('Flits:order:AllLoaded', function(event){
     setTimeout(function(){
         Flits(".flits-order-list-container .flits-pagination-div ul.flits-pagination li:first").click();
     },1500);
   });
  
  
  Flits(document).on('Flits:SocialLogin:Loaded', function(event){
    var data = event.detail;
    data.settings.domSelector = [['form#customer_login', !0], ['form#create_customer', !0], ['form#RegisterForm', !0], ['form[action="/account/login"]:not(#customer_login_guest)', !0], ['form[action="/account"][method="post"]', !0]];
  });
  Flits(document).on('Flits:SocialLogin:Loaded', function(event){  
    setTimeout(function(){
      if (location.pathname.indexOf("/account") == -1){  
        Flits.setLocalStorage('flits_before_login_url','/account');
      }
    }, 800);
  });
  Flits(window).load(function() {
    if (location.pathname.indexOf("/account") == -1){     
      if (location.pathname.indexOf("checkout") != -1)
      {
        Flits.setLocalStorage('flits_before_login_url',location.pathname);
      }else{
        Flits.setLocalStorage('flits_before_login_url','/account');
      }
    }
  });
    Flits(window).on('Flits:setPhoneCountryCode:Loaded', function(event){  
    Flits.settings = event.detail.settings;
    Flits.settings.country_list = [{
      countryName: 'India',
      code: 'IN',
      phoneCode: '91'
    }]     
  });
  Flits(document).on('Flits:AccountPage:Loaded', function(event){  
    var data = event.detail;
    data.settings.active_tab = '#order';
    Flits.shopCountryName = 'India'
  });
  
  Flits(document).on('Flits:order:Loaded', function(event){ 
    var data = event.detail;
    console.log(data);
  });
  
  
  /* Cancel-order-popup.liquid custom Flits JS - START */
    //global variables

    Flits(document).on('click','.cancelBtn',function(){
      cancel_button = Flits(this);
    });

    //creating dynamic modal form
    Flits(document).on('change','.cancelOrderReason',function(){
      if(Flits(this).val() == 'Order would not arrive on time' || Flits(this).val() == 'Product price too high' || Flits(this).val() == 'Need to change shipping address' || Flits(this).val() == 'Need to change payment method'
         || Flits(this).val() == 'Others' || Flits(this).val()== 'I want to change the variant (For ex: Black to Blue)'){ //open modal 
        Flits('#formModal .modal__content').empty();
        Flits('#reason_date').trigger("click"); 
        reason = Flits(this).val();
      }
      if(reason == 'Order would not arrive on time'){
        let modal_body = `
              <!-- Modal Header -->
              <div class="modal-header">
				<span>&nbsp;</span>
                 <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button>        
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">
				<div class="input__wrapper" style="display:none">
                  <label for="requested_single_date"><span class="warning">*</span> Requested Delivery Date:</label>
                  <input type="date" id="requested_single_date"/>
                </div>
                <div class="input__wrapper">
                  <label for="urgency_text"><span class="warning">*</span> When would you like delivery?</label>
                  <textarea  id="urgency_text" placeholder="Please elaborate" class="required"></textarea>
                </div>
                <div class="input__wrapper date_range_holder">
                  <div class="date_range">
					<label for="requested_Start_date"> Deliver after this date:</label>
                    <input type="date" id="requested_Start_date" />
                  </div>
                   <div class="date_range">
                    <label for="requested_end_date">Deliver before this date:</label>
                    <input type="date" id="requested_end_date" />
                  </div>
                </div>
                <p class="error_text warning"></p>
              </div>
            <!-- Modal body -->
			<div class="modal-footer">
                  <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                  <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
                </div>`
        Flits(modal_body).appendTo('#formModal .modal__content');
      }
//       if(reason == "I would like to choose another product"){
//       	let modal_body = `
//               <!-- Modal Header -->
//               <div class="modal-header">
//       				<span>&nbsp;</span>
//                 <button type="button" class="close" data-dismiss="modal">&times;</button>        
//               </div>

//               <!-- Modal body -->
//               <div class="modal-body" style="overflow:hidden; text-align: center;">
//                 <div class="input__wrapper">
//                   	<label>Would you need our Headphone Guru’s help in choosing another product?</label></br>
// 					<label class="selection-label" for="yes-selection"><input type="radio" id="yes-selection" name="help-required" value="Yes" checked>Yes! Please help me.</label></br>
// 					<label class="selection-label" for="no-selection"><input type="radio" id="no-selection" name="help-required" value="No">No, I know what I want.</label>
//   				</div>
//                 <p class="error_text warning"></p>

//               </div>
//             <!-- Modal body -->
      //                 <div class="modal-footer">
//                   <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
//                   <button type="button" class="btn select_reverse" data-dismiss="modal" style="color:white">Don't Cancel</button>
//                 </div>`
//         Flits(modal_body).appendTo('#formModal .modal__content');
//       }
      if (reason == 'I want to change the variant (For ex: Black to Blue)'){
                let modal_body = `
              <!-- Modal Header -->
              <div class="modal-header">
				<span>&nbsp;</span>
               <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button>      
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">

                <div class="input__wrapper">
                  <label for="more_details"><span class="warning">*</span> Please share more details</label>
                  <textarea required id="more_details" placeholder="Enter details here..." class="required"></textarea>
                </div>
				 <p class="error_text warning"></p>

              </div>
            <!-- Modal body -->
                <div class="modal-footer">
                  <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                  <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
                </div>`
        Flits(modal_body).appendTo('#formModal .modal__content');
      }      
      if(reason == 'Product price too high'){
                  let modal_body = `<!-- Modal Header -->
              <div class="modal-header">
				<span>&nbsp;</span>
                <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button>  
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">
                <div class="input__wrapper">
                  <label for="cheap_link"><span class="warning">*</span> Please share the link of the product being priced cheaper than Headphone Zone.</label>
                  <input type="url" id="cheap_link" class="required" placeholder="Paste URL here"/>
                </div>
                <p class="error_text warning"></p>

              </div>
            <!-- Modal body -->
                <div class="modal-footer">
                  <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                  <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
                </div>`
        Flits(modal_body).appendTo('#formModal .modal__content');
      }
      if(reason == 'Need to change payment method'){
       let modal_body = `
              <!-- Modal Header -->
              <div class="modal-header">
				<span>&nbsp;</span>
                <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button>         
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">
                <div class="input__wrapper">
                  <label for="payment_method"><span class="warning">*</span> What payment method would you like to use?</label>
                  <textarea  id="payment_method" placeholder="Enter your preferred payment method here" class="required"></textarea>
                </div>
                <p class="error_text warning"></p>

              </div>
            <!-- Modal body -->
                <div class="modal-footer">
                  <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                  <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
                </div>`
        Flits(modal_body).appendTo('#formModal .modal__content');
      }
      if(reason == 'Need to change shipping address'){
        let modal_body = `
              <!-- Modal Header -->
              <div class="modal-header">
				  <span>&nbsp;</span>	
                  <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button> 
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">
                <div class="input__wrapper">
                  <label for="request__address"><span class="warning">*</span> Please share the updated delivery address:</label>
                  <textarea  id="request__address" placeholder="Enter your Address here" class="required"></textarea>
                </div>
                <div class="input__wrapper">
                  <label for="request__pincode"><span class="warning">*</span> Enter Pincode:</label>
                  <input type="number" id="request__pincode" max="6" placeholder ="Enter your 6 digit pincode" class="required" />
                </div>
                <p class="error_text warning"></p>

              </div>
            <!-- Modal body -->
                <div class="modal-footer">
                  <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                  <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
                </div>`
        Flits(modal_body).appendTo('#formModal .modal__content');
      }
      if(reason == 'Others'){
           let modal_body = `
              <!-- Modal Header -->
              <div class="modal-header">
				   <span>&nbsp;</span>
                   <button type="button" class="modal__close-button" data-action="close" title="close">
                     <svg focusable="false" width="14" height="14" class="icon icon--close" viewBox="0 0 14 14">
                       <path d="M13 13L1 1M13 1L1 13" stroke="currentColor" stroke-width="2" fill="none"></path>
                     </svg>
              </button>         
              </div>

              <!-- Modal body -->
              <div class="modal-body" style="overflow:hidden; text-align: center;">
                <div class="input__wrapper">
                  <label for="request__reason"><span class="warning">*</span> Please share why you would like to cancel your order. The more information we have, the better we'll be able to help.</label>
                  <textarea  id="request__reason" placeholder="Enter your reason here" class="required"></textarea>
                </div>
                <p class="error_text warning"></p>

              </div>
            <!-- Modal body -->
            <div class="modal-footer">
                <button id="cancelOrderFormSubmit" type="button" class="btn" style="color:white">Submit</button>
                <button type="button" class="btn select_reverse" data-action="close" style="color:white">Don't Cancel</button>
            </div>`
           Flits(modal_body).appendTo('#formModal .modal__content');
      }    

    });
    
    //gathering variables
    Flits(document).on('click','#reason_date',function(){
       order_id = cancel_button.attr("data_id");
       line_item_id = cancel_button.attr("data_line_item_id");
       customer_id = Flits.customer_id;
    });
    
    //change select on popup close
    Flits(document).on('click','.close, .select_reverse',function(){
      Flits('select.cancelOrderReason').val("I don't want this product any more").change();
    });
    

    //submit form
    Flits(document).on('click','#cancelOrderFormSubmit',function(){
      let data = {};
      let single_date = "";
      let urgent_text ="";
      let requested_end_date ="";
      let requested_start_date ="";
      let cheap_link = "";
      let request_address ="";
      let request_pincode = "";
      let other = "";
      let variant_change = "";
      let payment_method = "";
      let help_required = ""
      
      //date option change
      if(reason == 'Order would not arrive on time'){
        //data for date option
        requested_start_date = Flits('#requested_Start_date').val(); //start date
        requested_end_date = Flits('#requested_end_date').val(); //end date
        
        //add another field with id "requested_single_date" 
       //   single_date = Flits('#requested_single_date').val(); //single date field value
        single_date = "00/00/0000" //single date field value
        urgent_text = Flits('#urgency_text').val(); //textarea value

        //validation for date range
        if(requested_start_date && !requested_end_date){
          Flits('#requested_end_date').addClass("input_error");

        }else if(!requested_start_date && requested_end_date){
          Flits('#requested_start_date').addClass("input_error");
        }
        else{
          Flits('#requested_start_date, #requested_end_date').removeClass("input_error");
        } //date range validation ends here
      }//data for date option ends here
      
      //Choose different product
//       if(reason == 'I would like to choose another product'){
//         help_required = Flits('input[name="help-required"]:checked').val();
//       }
      
      //change variant
      if(reason == 'I want to change the variant (For ex: Black to Blue)'){
        variant_change = Flits('#more_details').val();
      }
      
      //product price too high 
      if(reason == 'Product price too high'){
       cheap_link = Flits('#cheap_link').val();
      }
      
      //change shipping address
      if(reason == 'Need to change shipping address'){
        request_address = Flits('#request__address').val();
        request_pincode = (Flits('#request__pincode').val()).toString();
      }
      
      //change payment method
      if(reason == 'Need to change payment method'){
        payment_method = Flits('#payment_method').val();
      }
      
      //other
      if(reason == 'Others'){
        other = Flits('#request__reason').val();
      }
      
      //validation for required fields
      Flits('.required').each(function(){  
        if(!Flits(this).val()){
         Flits(this).addClass("input_error"); //input class for styling error input
        }
        else{
         Flits(this).removeClass("input_error");
        }
      }); 
      //validation for required field ends here
      
      //validation for pincode
      if(request_pincode){
        if(request_pincode.length < 6 || request_pincode.length > 6){
          Flits('#request__pincode').addClass("input_error pin_error");
        }
        else{
          Flits('#request__pincode').removeClass("input_error");
        }
      }
      
      //validation for url 
      var expression =  /[-a-zA-Z0-9@:%_\+.~#?&//=]{2,256}\.[a-z]{2,4}\b(\/[-a-zA-Z0-9@:%_\+.~#?&//=]*)?/gi; 
      var regex = new RegExp(expression); 
      if (cheap_link.match(regex)) { 
       Flits('#cheap_link').removeClass("input_error url_error");
      } else { 
        Flits('#cheap_link').addClass("input_error url_error");
      }
      //validation before calling apis
      if(Flits('#formModal input, #formModal textarea').hasClass("pin_error") && Flits('#formModal input, #formModal textarea').hasClass("input_error")){
        Flits('.error_text').text("Please enter valid pin code").show();
      }//validation ends
       else if(Flits('#formModal input, #formModal textarea').hasClass("url_error") && Flits('#formModal input, #formModal textarea').hasClass("input_error")){
        Flits('.error_text').text("Please enter valid url").show();
      }//validation ends
      else if(Flits('#formModal input, #formModal textarea').hasClass("input_error")){
         Flits('.error_text').text("Please fill all the required field").show();
      }
      
      else{
        $btn = Flits(this);
        Flits(this).text('Processing');
        Flits(this).attr( 'disabled' , true );
        Flits(this).css( 'background', '#444444;');
      //api call starts here
      Flits('.error_text').hide(); //hiding all error text
        
       //data for date option
       //Data to be passed for api
        
        //Order would not arrive in time
      if(reason == 'Order would not arrive on time'){
       data = {
         "customer_requested_delivry_date" : single_date,
         "urgency_details" : urgent_text,
         "customer_requested_delivry_date_range" : requested_start_date+" "+requested_end_date,
         "reason" : reason,
         "order_id" : order_id,
         "line_item_id" : line_item_id,
         "customer_id":customer_id 
        }
       }
        
        //I want to change the variant
        if(reason == 'I want to change the variant (For ex: Black to Blue)'){
          data = {
            "reason" : reason,
            "more_details":variant_change,
            "order_id" : order_id,
            "line_item_id" : line_item_id,
            "customer_id":customer_id
          }
        }
        
        //Choose different product
        if(reason == 'I would like to choose another product'){
          data = {
            "reason" : reason,
            "order_id" : order_id,
            "line_item_id" : line_item_id,
            "customer_id":customer_id
          }
        }
        
        //price too high
        if(reason == 'Product price too high'){
           data = {
           "cheap_price_link" : cheap_link,
           "reason" : reason,
           "order_id" : order_id,
           "line_item_id" : line_item_id,
           "customer_id":customer_id 
          }
        }
        
        //change payment method
        if(reason == 'Need to change payment method'){
          data = {
            "reason" : reason,
            "order_id" : order_id,
            "line_item_id" : line_item_id,
            "customer_id":customer_id,
            "payment_method":payment_method
          }
        }
        
        //change shipping address
        if(reason == 'Need to change shipping address'){
          data = {
            "reason" : reason,
            "order_id" : order_id,
            "line_item_id" : line_item_id,
            "customer_id":customer_id,
            "updated_delivery_address":request_address,
            "pincode":request_pincode
          }
        }
        
        //change shipping address
        if(reason == 'Others'){
          data = {
            "reason" : reason,
            "order_id" : order_id,
            "line_item_id" : line_item_id,
            "customer_id":customer_id,
            "reason_for_cancellation": other
          }
        }
        //Ajax settings for cancellation
        var settings = {
          "timeout": 10000 ,
          "async": true,
          "crossDomain": true,
          "url": "https://cors-anywhere.herokuapp.com/https://cancel.headphonezone.in/cancel/api",
          "method": "POST",
          "processData": false,
          "data": JSON.stringify(data),
          "headers":{
            "Content-Type":"application/json"
          }
        } //end of settings
        
        Flits.ajax(settings).done(function (response) {
          Flits('.close').click();
          Flits('#success').trigger('click');
          Flits('#successModal .response_text').text(response.msg).addClass("success");
          cancel_button.val("Cancellation Requested").css("color","#C4C4C4").prop("disabled",true);
        }).fail(function(response,textStatus){
            $btn.prop("disabled",true);
          $btn.text("cancel");
            Flits('.error_text').text("oops! some error occurred. Try again later").show();
            setTimeout(function(){ 
              $btn.attr( 'disabled' , false );
            }, 3000);
        })
      } //end of else
    }); //end of click
  
    var dummyButtonInterval;
    Flits(document).on('click','.dummy__button', function() {
      var dateData = Flits(this).attr('data-order-date');
      var countDownDate = new Date(dateData).getTime();

      //Cleaning UI and data
      document.getElementById("time").innerHTML = "";
      clearInterval(dummyButtonInterval);

      var dummyButtonInterval = setInterval(function() {
        var now = new Date().getTime();
        var distance = now - countDownDate;
        let h = Math.floor((distance / 1000)/ 3600);

        if (h >= 1) {
          clearInterval(dummyButtonInterval);
          document.getElementById("time").innerHTML = "";
          location.reload();
          return;
        }

        var minute = 59 - (Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)));
        var second = 60 - (Math.floor((distance % (1000 * 60)) / 1000));
        document.getElementById("time").innerHTML = minute + "mins " + second + "s ";
      }, 1000);  
    });
  /* Cancel-order-popup.liquid custom Flits JS - END */
  
  Flits(document).on("click", ".flits-order-action-row [data-toggle='modal']", function () {
    var el = Flits(this);
    var target = el.attr("data-target");
    Flits(target).attr("open","true");
    Flits(target).css("display","block");
  });
  Flits(document).on("click", ".flits-modal-content [data-action='close']", function () {
     Flits(this).parents('.flits-modal-content').hide();
     Flits(this).parents('.flits-modal-content').removeAttr('open');
  });

    Flits(document).on("click", ".flits-order-cancel", function(){
            Flits(".flits-custom-overlay, .flits-custom-popup").fadeIn();
        });

        // Close popup when close button is clicked
        Flits(document).on("click", ".flits-custom-close-popup", function(){
            Flits(".flits-custom-overlay, .flits-custom-popup").fadeOut();
        });

        // Close popup when clicking outside of it
        Flits(document).on("click", ".flits-custom-overlay", function(){
            Flits(".flits-custom-overlay, .flits-custom-popup").fadeOut();
        });

        // Prevent closing the popup when clicking inside of it
        Flits(document).on("click", ".flits-custom-popup", function(event){
            event.stopPropagation();
        });

        // Handle click on "Raise a ticket" link
        Flits(document).on("click", "#raise-ticket", function(){
            // Handle the action for raising a ticket here
            // For example, redirect the user to a ticket submission page
            alert("Handle the action for raising a ticket here");
            Flits(".flits-custom-overlay, .flits-custom-popup").fadeOut();
        });

}(Flits));
	
    let reason = "";
    let order_id ="";
    let line_item_id ="";
    let customer_id="";
    let cancel_button = "";
	var dataObj = {};
  	var textId = "";
  	var orderNote = "";

  function inputOrderDetails(event){
    let orderId = Flits(event.target).attr('data_id');
    let lineItemId = Flits(event.target).attr('data_line_item_id');
    let shopName = 'headphone-zone';
//     let customerId = '{{customer.id}}';
    let customerId = Flits(event.target).attr('data_customer_id');
    orderNote = Flits(event.target).attr('data_order_note');
    dataObj =  { shop_name: shopName, order_id: orderId, customer_id: customerId, line_item_id: lineItemId, note: orderNote};
    textId = '[data_line_item_id='+ lineItemId + ']';
  }

  function cancelOrderReasonWithCalling(event){
    let reason= Flits('.cancelOrderReason').val();
    dataObj.reason = reason;
    cancelOrder(event);
  }

	function cancelOrder(event){
    console.log(dataObj);
    console.log(textId);
    console.log(orderNote);
    let dataStringObj = JSON.stringify(dataObj);
    
    let apiURL = 'https://cancel.headphonezone.in/cancel/api';
    
    if (dataObj.reason == 'I want to change the variant (For ex: Black to Blue)') {
      apiURL = 'https://cancel.headphonezone.in/cancel/api'
    }

    var settings = {
      "async": true,
      "crossDomain": true,
      "url": apiURL,
      "method": "POST",
      "processData": false,
      "data": dataStringObj,
      "headers":{
        "Content-Type":"application/json"
      },
      beforeSend: function (e) {
        Flits(textId).html('Processing');
        Flits(textId).attr( 'disabled' , true );
        Flits(textId).css( 'color', 'green');
      },
      //     	 complete: function (e) {
      //         	console.log('Operation of Ajax Call Completed');
      //     	 },
      success: function (e) {
        Flits(textId).html('Cancelled');
        Flits(textId).css( 'text-transform', 'uppercase');
        Flits(textId).attr( 'disabled' , true );
        Flits(textId).css( 'color', '#d54d4d');
        /* Following lines added by Flits Team - 25-jan-2021 - Tony Stark kindly contact them before removeing it */
        /* this lines are used to updated cancelled label in Flits-Account page order history */	
        /* this function is defined in flits-account.js */
        /* Flits Code started */
//         window.flitsApp.cancelledOrderCallbackMarmeto();
        cancelledOrderCallbackMarmeto(event);
        /* Flits Code ended */

      },
      error: function(e){
        Flits(textId).val('Error Occured');
        Flits(textId).css( 'color', '#ff9494');

        setTimeout(function(){ 
          Flits(textId).val('Cancel');
          Flits(textId).css( 'color', '#03a196');
          Flits(textId).attr( 'disabled' , false );
        }, 3000);

      }
    }
    Flits.ajax(settings).done(function (response) {
      console.log(response);
      dataObj = {};
      textId = "";
      orderNote = "";
    });
  }

function cancelledOrderCallbackMarmeto (event)  {
  var t = dataObj.order_id,
      e = "Order is cancelled successfully.";
  ["I want to change the variant (For ex: Black to Blue)", "Order would not arrive on time", "Product price too high", "Need to change shipping address", "Others"].includes(dataObj.reason) &&
    (Flits('.flits-order-row[data-order-id="' + t + '"] .flits-order-cancel-label').html("Cancellation Requested"), (e = "Order cancellation request sent successfully")),
    Flits('.flits-order-row[data-order-id="' + t + '"] .flits-order-cancel-label').removeClass("flits-d-none"),
//     Flits('.flits-order-row[data-order-id="' + t + '"').toast(e, { time: 2e3, position: "bottomLeft" });
    flitsSnackbar.show({
    text: e,
    pos: "bottom-center",
    showAction: !1,
    customClass: "flits-alert-success",
  });
  
  
};