angular.module("tde.services.engine-driver", [])

.service("EngineDriver", function()
{
  var self = this

  this.logBuffer = []
  this.currentTime = 0

  this.loadTexture = function(name, data)
  {
  }

  this.unloadTexture = function(name)
  {
  }

  this.loadGeometry = function(name, data)
  {
    self.logInfo("loading " + name)
  }

  this.unloadGeometry = function(name)
  {
  }

  this.loadSequence = function(name, data)
  {
    self.logInfo("loading " + name)

    try
    {
      eval(data)
      demo_init()
      gfx_init()
      render_scene(scenes[0], 0, 0);
      engine_render(self.currentTime)
    }
    catch (err)
    {
      self.logError(err.message, err.stack)
    }
  }

  this.unloadSequence = function(name)
  {
    // leak everything
  }

  this.loadSong = function(name, data)
  {
    self.logInfo("loading " + name)

    try
    {
      eval(data)
      snd = new SND(SONG)
    }
    catch (err)
    {
      self.logError(err.message, err.stack)
    }
  }

  this.unloadSong = function(name)
  {
    if (snd)
      snd.playing = false
  }

  this.loadShader = function(name, data)
  {
  }

  this.unloadShader = function(name)
  {
  }

  this.logInfo = function(message, details)
  {
    toastr.info(details, message);
    console.log(message)
    this.logBuffer.push({
      type: "info",
      message: message,
      details: details
    })
  }

  this.logError = function(message, details)
  {
    toastr.error(details, message);
    console.error(message)
    console.error(details)
    this.logBuffer.push({
      type: "error",
      message: message,
      details: details
    })
  }

  this.drawFrame = function()
  {
    engine_render(this.currentTime)
  }
  
  this.play = function()
  {
    this.playing = true
    this.seek(this.currentTime)
    if (snd) {
      snd.p()
    }

    function render()
    {
      if (snd)
        self.currentTime = snd.t()
      else
        self.currentTime = 0;
      
      self.drawFrame()
      
      if (self.playing)
        requestAnimationFrame(render)
    }

    render()
  }

  this.pause = function()
  {
    this.playing = false
    if (snd)
      snd.s()
  }

  this.seek = function(time)
  {
    self.currentTime = time
    if (snd)
      snd.startTime = ac.currentTime - time * (60 / 125) // tempo is 125

    if (!this.playing)
      engine_render(self.currentTime)
  }
})
