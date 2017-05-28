class BooksController < ApplicationController
	def index
		
			uri = URI.parse('https://api.wattpad.com/v4/stories?')
			params = {:filter => 'hot', :category => '11', :limit => '50' }
			uri.query = URI.encode_www_form(params)
			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			http.ca_file = 'C:\RailsInstaller\Ruby2.2.0\lib\ruby\2.2.0\rubygems\ssl_certs\cacert.pem'
			req = Net::HTTP::Get.new(uri)
			req.add_field("Authorization", "Basic CACaKO3XYOJlASJMMS06aCpszNx6soN9M9COwMzji6E0")
			resp = http.request(req)
			full_resp = resp.body
			puts full_resp
			if request.xhr?
			   render json: full_resp 
			else
				puts "no xhr"
			end	
	   

	end

	 def library
	 	    story = Story.new(story_params)
	 	    uri = URI.parse('https://api.wattpad.com/v4/stories?')
			params = {:filter => 'hot', :category => story.category.to_s, :limit => '50' }
			uri.query = URI.encode_www_form(params)
			http = Net::HTTP.new(uri.host, uri.port)
			http.use_ssl = true
			http.ca_file = 'C:\RailsInstaller\Ruby2.2.0\lib\ruby\2.2.0\rubygems\ssl_certs\cacert.pem'
			req = Net::HTTP::Get.new(uri)
			req.add_field("Authorization", "Basic CACaKO3XYOJlASJMMS06aCpszNx6soN9M9COwMzji6E0")
			resp = http.request(req)
			full_resp = resp.body
			puts full_resp
			if request.xhr?
			   render json: full_resp 
			else
				puts "no xhr"
			end	

	 end

	private

	def story_params
		params.require(:story).permit(:category)
	end

end
