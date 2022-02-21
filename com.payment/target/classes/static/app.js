
const PaymentStarted = ()=>{

    console.log("Payment started");
    let amount = $("#pay").val();
    console.log(amount);
    if(amount == "" || amount == null)
    {
        alert("Enter Amount");
        return;
    }
    
    //create request 
    $.ajax(
        {
            url:'/user/create_order',
            data:JSON.stringify({amount:amount,info:'Order Request'}),
            contentType:'application/json',
            type:'POST',
            dataType:'json',
            success:function(response){
                console.log(response);
				if(response.status == "created")
				{
					let options = {
						key:'rzp_test_0byQbY8G00vvNQ',
						amount:response.amount,
						currency:'INR',
						name:'Demo Payment',
						description:'Demo Payment Gatweway',
						order_id:response.id,
						handler:function(response){
							 console.log(response.razorpay_payment_id);
        					 console.log(response.razorpay_order_id);
        					console.log(response.razorpay_signature);
							alert("Payment Successfull");
							
						},
						prefill: {
        							name: "",
        							email: "",
        							contact: ""
    							},
    					notes: {
        						address: "Demo Address"
    							},
    					theme: {
        						color: "#3399cc"
   							 }
						
					};

                    let rz1 = new Razorpay(options);
                    
                    rz1.on('payment.failed', function (response){
                        alert(response.error.code);
                        alert(response.error.description);
                        alert(response.error.source);
                        alert(response.error.step);
                        alert(response.error.reason);
                        alert(response.error.metadata.order_id);
                        alert(response.error.metadata.payment_id);
                });
				rz1.open();

				}
            },
            error:function(error){
				console.log(error);
                alert("Something went wrong");
            }

        }
    )


}


