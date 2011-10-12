var Enumerable = function(aArray)
{
	this.wrapArray(aArray);
	return aArray;
};
Enumerable.prototype.loop = function(fpProcess)
{
	if(!fpProcess)
	{
		return null;
	}
	var nElement = 0;
	var nLenElements = this.length;
	var oItem = null;
	var oAfterProcess = null;
	for(; nElement < nLenElements; nElement++)
	{
		oItem = this[nElement];
		oAfterProcess = fpProcess.apply(this, [oItem, nElement]);
		if(oAfterProcess !== null)
		{
			return oAfterProcess;
		}
	}
	return null;
};
Enumerable.prototype.getIndex = function(oElement)
{
	return this.loop(function(oItem, nElement)
	{
		if(oItem == oElement)
		{
			return nElement;
		}
		return null;
	});
};
Enumerable.prototype.add = function(oElement)
{
	if(arguments.length === 0)
	{
		return this;
	}
	this.push(oElement);
	return this;
};
Enumerable.prototype.find = function(oElement)
{
	return this.loop(function(oItem)
	{
		if(oItem == oElement)
		{
			return oItem;
		}
		return null;
	});
};
Enumerable.prototype.remove = function(oElement)
{
	var nIndex = this.getIndex(oElement);
	if(nIndex !== null)
	{
		this.splice(nIndex, 1);
		return oElement;
	}
	return false;
};
Enumerable.prototype.wrapArray = function(aArray)
{	
	aArray.add = Enumerable.prototype.add;
	aArray.loop = Enumerable.prototype.loop;
	aArray.getIndex = Enumerable.prototype.getIndex;
	aArray.find = Enumerable.prototype.find;
	aArray.remove = Enumerable.prototype.remove;
};

if(!Array.prototype.enumerable)
{
	Array.prototype.enumerable = function()
	{
		return new Enumerable(this);
	};
}