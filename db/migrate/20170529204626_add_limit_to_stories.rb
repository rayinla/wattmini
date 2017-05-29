class AddLimitToStories < ActiveRecord::Migration[5.0]
  def change
    add_column :stories, :limit, :integer
  end
end
