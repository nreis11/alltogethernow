require 'rufus/scheduler'

use Rack::Static,
  :urls => ["/images", "/js", "/css", "/sounds", "/fonts"],
  :root => "public"

run lambda { |env|
  [
    200,
    {
      'Content-Type'  => 'text/html',
      'Cache-Control' => 'public, max-age=86400'
    },
    File.open('public/index.html', File::RDONLY)
  ]
}

# Ping url every 10 minutes to stay alive
scheduler = Rufus::Scheduler.new

    if Rack::Static
      scheduler.every '10m' do
         require "net/http"
         require "uri"
         Net::HTTP.get_response(URI.parse(ENV["HOSTNAME"]))
      end
    end