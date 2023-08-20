import 'dart:html';

import 'package:flutter/material.dart';

class Abaco extends StatefulWidget {
  const Abaco({Key? key}) : super(key: key);

  @override
  _AbacoState createState() => _AbacoState();
}

class _AbacoState extends State<Abaco> {
  bool _isBlueDropped = false;
  bool _isRedDropped = false;
  bool _isYelloDropped = false;
  String _blue = 'blue';
  String _red = 'red';
  String _yellow = 'yellow';

  @override
  Widget build(BuildContext context) {
    return SafeArea(
      child: Scaffold(
          body: Row(
        mainAxisAlignment: MainAxisAlignment.spaceEvenly,
        children: [
          SizedBox(
            width: 25,
          ),
          Center(
            child: Container(
              height: 450,
              width: 500,
              child: Stack(
                children: [
                  Positioned(
                    top: 100,
                    left: 150,
                    child: DragTarget<String>(
                      builder: (
                        BuildContext context,
                        List<dynamic> accepted,
                        List<dynamic> rejected,
                      ) {
                        return SizedBox(
                          height: 370,
                          width: 250,
                          child: Image.asset(_isBlueDropped
                              ? 'assets/images/blue.png'
                              : 'assets/images/boardbl.png'),
                        );
                      },
                      onWillAccept: (data) {
                        return data == _blue;
                      },
                      onAccept: (data) {
                        setState(() {
                          _isBlueDropped = true;
                        });
                      },
                    ),
                  ),
                  Positioned(
                    top: 100,
                    left: 1,
                    child: DragTarget<String>(
                      builder: (
                        BuildContext context,
                        List<dynamic> accepted,
                        List<dynamic> rejected,
                      ) {
                        return SizedBox(
                          height: 370,
                          width: 250,
                          child: Image.asset(_isRedDropped
                              ? 'assets/images/red.png'
                              : 'assets/images/boardrd.png'),
                        );
                      },
                      onWillAccept: (data) {
                        return data == _red;
                      },
                      onAccept: (data) {
                        setState(() {
                          _isRedDropped = true;
                        });
                      },
                    ),
                  ),
                  Positioned(
                    top: 100,
                    left: 300,
                    child: DragTarget<String>(
                      builder: (
                        BuildContext context,
                        List<dynamic> accepted,
                        List<dynamic> rejected,
                      ) {
                        return SizedBox(
                          height: 370,
                          width: 258,
                          child: Image.asset(_isYelloDropped
                              ? 'assets/images/yellow.png'
                              : 'assets/images/boardyl.png'),
                        );
                      },
                      onWillAccept: (data) {
                        return data == _yellow;
                      },
                      onAccept: (data) {
                        setState(() {
                          _isYelloDropped = true;
                        });
                      },
                    ),
                  ),
                ],
              ),
            ),
          ),
          SizedBox(
            width: MediaQuery.of(context).size.width * 0.15,
          ),
          Divider(
            thickness: 5,
            color: Colors.white,
          ),
          Expanded(
            child: SingleChildScrollView(
              child: Row(
                children: [
                  Visibility(
                    visible: !_isRedDropped,
                    child: Draggable<String>(
                      // Data is the value this Draggable stores.
                      data: _red,
                      child: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/red.png'),
                        ),
                      ),
                      feedback: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/red.png'),
                        ),
                      ),
                      childWhenDragging: Container(),
                    ),
                  ),
                  Visibility(
                    visible: !_isBlueDropped,
                    child: Draggable<String>(
                      // Data is the value this Draggable stores.
                      data: _blue,
                      child: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/blue.png'),
                        ),
                      ),
                      feedback: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/blue.png'),
                        ),
                      ),
                      childWhenDragging: Container(),
                    ),
                  ),
                  Visibility(
                    visible: !_isYelloDropped,
                    child: Draggable<String>(
                      // Data is the value this Draggable stores.
                      data: _yellow,
                      child: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/yellow.png'),
                        ),
                      ),
                      feedback: Container(
                        height: 165.0,
                        width: 165.0,
                        child: Center(
                          child: Image.asset('assets/images/yellow.png'),
                        ),
                      ),
                      childWhenDragging: Container(),
                    ),
                  ),
                ],
              ),
            ),
          ),
        ],
      )),
    );
  }

  void showSnackBarGlobal(BuildContext context, String message) {
    ScaffoldMessenger.of(context).removeCurrentSnackBar();
    ScaffoldMessenger.of(context).showSnackBar(SnackBar(
        content: Text(
      message,
      textScaleFactor: 2,
    )));
  }
}
