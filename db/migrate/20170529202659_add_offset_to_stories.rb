class AddOffsetToStories < ActiveRecord::Migration[5.0]
  def change
    add_column :stories, :offset, :integer
  end
end
