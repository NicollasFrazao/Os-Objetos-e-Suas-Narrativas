/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() 
    {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() 
    {
        indicadorAudio = -1;

		btn_tutorialAD.onclick = function()
		{
			player_audio.pause();
			
			if (indicadorAudio == 1)
			{
				playerObra = document.createElement('div');
				$(playerObra).addClass('row');
				$(playerObra).addClass('playerObra');

				elemento = document.createElement('div');
				$(elemento).addClass("col-sm-12")

				playerObra.insertAdjacentElement('beforeend', elemento);

				elemento = document.createElement('audio');
				elemento.controls = true;
				elemento.src = 'dist/mp3/tutorialAD/btn_tutorialAD1.mp3';

				playerObra.children[0].insertAdjacentElement('beforeend', elemento);

				this.insertAdjacentElement('beforeend', playerObra);

				this.getElementsByTagName("audio")[0].play()

				indicadorAudio = -1;
			}
			else
			{
				$(".playerObra").remove();

				player_audio.src = 'dist/mp3/tutorialAD/btn_tutorialAD0.mp3';
				player_audio.play();

				indicadorAudio = 1;				
			}
		}

		btn_AD.onclick = function()
		{
			player_audio.pause();
			
			if (indicadorAudio == 2)
			{
				indicadorAudio = -1;

				window.location.href = "sessaoAD.html";
			}
			else
			{
				$(".playerObra").remove();
				
				player_audio.src = 'dist/mp3/AD/btn_AD.mp3';
				player_audio.play();

				indicadorAudio = 2;
			}
		}
    }
};

app.initialize();