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

        btn_voltar.onclick = function()
        {
            if (indicadorAudio == -2)
            {
                indicadorAudio = -1;
                history.back();
            }
            else
            {
                indicadorAudio = -2;

                player_audio.pause();
                player_audio.src = 'dist/mp3/botoes/btn_voltar.mp3';
                player_audio.play();
            }

            return false;
        }

        this.getAreas();
    },
    getAreas: function()
    {
        $.getJSON
        (
            "dist/js/obrasAD.json", 
            function(dados)
            {
                areasAD = dados.areas;

                while (lst_areas_pavimento1.firstChild)
                {
                    lst_areas_pavimento1.removeChild(lst_areas_pavimento1.firstChild);
                }

                while (lst_areas_pavimento2.firstChild)
                {
                    lst_areas_pavimento2.removeChild(lst_areas_pavimento2.firstChild);
                }
                
                for (cont = 0; cont <= areasAD.length - 1; cont = cont + 1)
                {
                    var elementoArea = document.createElement('div');
                    $(elementoArea).addClass('row');
                    
                    elementoArea.audioBotao = areasAD[cont].audioBotao;
                    elementoArea.indexArea = cont;

                    if ('indicadorSubArea' in areasAD[cont] && areasAD[cont].indicadorSubArea)
                    {
                        elementoArea.indicadorSubArea = true;
                    }
                    else
                    {
                        elementoArea.indicadorSubArea = false;
                    }

                    elementoArea.onclick = function()
                    {
                        if (indicadorAudio == this.indexArea)
                        {
                            if (this.indicadorSubArea == true)
                            {
                                window.location.href = 'subAreaAD.html?indexArea=' + this.indexArea;
                            }
                            else
                            {
                                window.location.href = 'areaAD.html?indexArea=' + this.indexArea;
                            }
                        }
                        else
                        {
                            player_audio.pause();
                            player_audio.src = 'dist/mp3/botoes/' + this.audioBotao;
                            player_audio.play();

                            indicadorAudio = this.indexArea;
                        }
                    }

                    var elemento = document.createElement('div');
                    $(elemento).addClass('col-sm-12');
                    elementoArea.insertAdjacentElement('beforeend', elemento);

                    elemento = document.createElement('a');
                    
                    /*
                    if ('indicadorSubArea' in areasAD[cont] && areasAD[cont].indicadorSubArea)
                    {
                        elemento.href = 'subAreaLibras.html?indexArea=' + cont;
                    }
                    else
                    {
                        elemento.href = 'areaLibras.html?indexArea=' + cont;
                    }
                    */
                    
                    elementoArea.children[0].insertAdjacentElement('beforeend', elemento);

                    elemento = document.createElement('div');
                    $(elemento).addClass('info-box');
                    elementoArea.children[0].children[0].insertAdjacentElement('beforeend', elemento);

                    elemento = document.createElement('span');
                    $(elemento).addClass('info-box-icon');
                    $(elemento).addClass('bg-green');
                    elementoArea.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);

                    elemento = document.createElement('i');
                    $(elemento).addClass('fa');
                    elementoArea.children[0].children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                    
                    elemento = document.createElement('div');
                    $(elemento).addClass('info-box-content');
                    elementoArea.children[0].children[0].children[0].insertAdjacentElement('beforeend', elemento);
                    
                    elemento = document.createElement('span');
                    $(elemento).addClass('info-box-text');
                    elemento.textContent = areasAD[cont].nome.toLocaleUpperCase();
                    elementoArea.children[0].children[0].children[0].children[1].insertAdjacentElement('beforeend', elemento);

                    if (areasAD[cont].pavimento == 1)
                    {
                        lst_areas_pavimento1.insertAdjacentElement('beforeend', elementoArea);
                    }
                    else if (areasAD[cont].pavimento == 2)
                    {
                        lst_areas_pavimento2.insertAdjacentElement('beforeend', elementoArea);
                    }
                }
            }
        );
    }
};

app.initialize();