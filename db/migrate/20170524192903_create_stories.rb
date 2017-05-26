class CreateStories < ActiveRecord::Migration[5.0]
  def change
    create_table :stories do |t|
      t.string  	:title
      t.string  	:user
      t.string  	:cover
      t.integer 	:num_parts
      t.string	    :url
      t.string 		:tags, array: true, default: []
      t.integer		:categories, array: true, default: []    

      t.timestamps
    end
  end
end
