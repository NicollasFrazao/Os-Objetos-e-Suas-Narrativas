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
        this.getAreas();
    },
    getAreas: function()
    {
        $.getJSON
        (
            "dist/js/obrasLibras.json", 
            function(dados)
            {
                areasLibras = dados.areas;

                while (lst_areas_pavimento1.firstChild)
                {
                    lst_areas_pavimento1.removeChild(lst_areas_pavimento1.firstChild);
                }

                while (lst_areas_pavimento2.firstChild)
                {
                    lst_areas_pavimento2.removeChild(lst_areas_pavimento2.firstChild);
                }
                
                for (cont = 0; cont <= areasLibras.length - 1; cont = cont + 1)
                {
                    var elementoArea = document.createElement('div');
                    $(elementoArea).addClass('row');

                    var elemento = document.createElement('div');
                    $(elemento).addClass('col-sm-12');
                    elementoArea.insertAdjacentElement('beforeend', elemento);

                    elemento = document.createElement('a');
                    
                    if ('desabilitado' in areasLibras[cont] && areasLibras[cont].desabilitado == true)
                    {
                        elemento.href = '#null';
                    }
                    else if ('indicadorSubArea' in areasLibras[cont] && areasLibras[cont].indicadorSubArea)
                    {
                        elemento.href = 'subAreaLibras.html?indexArea=' + cont;
                    }
                    else
                    {
                        elemento.href = 'areaLibras.html?indexArea=' + cont;
                    }
                    
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
                    elemento.textContent = areasLibras[cont].nome.toLocaleUpperCase();
                    elementoArea.children[0].children[0].children[0].children[1].insertAdjacentElement('beforeend', elemento);

                    if (areasLibras[cont].pavimento == 1)
                    {
                        lst_areas_pavimento1.insertAdjacentElement('beforeend', elementoArea);
                    }
                    else if (areasLibras[cont].pavimento == 2)
                    {
                        lst_areas_pavimento2.insertAdjacentElement('beforeend', elementoArea);
                    }
                }
            }
        );
    }
};

app.initialize();