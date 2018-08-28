function saveCountry(country) {
    var conn = $.hdb.getConnection();   
    var output = JSON.stringify(country);  
    var fnCreateCountry = conn.loadProcedure("ETTRAIN.DB::createCountry");  
    var result = fnCreateCountry({IM_COUNTRY: country.name, IM_CONTINENT: country.partof});
    conn.commit();   
    conn.close();  
    if (result && result.EX_ERROR !== null)
    { return {body : result, status: $.net.http.BAD_REQUEST};}   
    else { return {body : output,      status: $.net.http.CREATED}; } 
	
} 
   // var country = { Name: $.request.parameters.get("name"),   partof: $.request.parameters.get("continent") }; 
   var body = $.request.body.asString();
   var country = JSON.parse(body); 
    // validate the inputs here! 
    var output = saveCountry(country); 
    $.response.contentType = "application/json"; 
    //$.response.setBody(output);
    $.response.setBody(output.body);
    $.response.status = output.status;
 