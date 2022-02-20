package com.payment.controller;

import java.util.Map;

import org.json.JSONObject;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import com.razorpay.*;


@Controller
public class PaymentController {
	
	@PostMapping(value = "/user/create_order")
	@ResponseBody
	public String GetRequest(@RequestBody Map<String,Object> mp) throws Exception {
		int amt = Integer.parseInt(mp.get("amount").toString());
		System.out.println(mp);
		var client = new RazorpayClient("rzp_test_0byQbY8G00vvNQ","sDfo3LkeJ1XUX3TeSJg3PVlI");
		JSONObject obj = new JSONObject();
		obj.put("amount",amt*100);
		obj.put("currency", "INR");
		obj.put("receipt","Tx_23768");
		Order order =client.Orders.create(obj); 
		System.out.println(order);
		return order.toString();
	}
	
	@RequestMapping(value ="/user")
	public String show() {
		return "Index";
		
	}
	
}
