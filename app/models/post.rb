# frozen_string_literal: true

class Post < ApplicationRecord
  has_one_attached :thumbnail
  has_many_attached :images
end
