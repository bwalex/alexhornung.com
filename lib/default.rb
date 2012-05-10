# All files in the 'lib' directory will be loaded
# before nanoc starts compiling.
require 'json'

include Nanoc3::Helpers::Rendering

include Nanoc3::Helpers::Blogging
include Nanoc3::Helpers::Breadcrumbs
include Nanoc3::Helpers::LinkTo 
include Nanoc3::Helpers::Tagging
include Nanoc3::Helpers::XMLSitemap 
