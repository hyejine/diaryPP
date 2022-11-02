package com.example.demo.service;

import javax.swing.ImageIcon;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class testImge extends JFrame{

    public void TestFrame(){
        JLabel imgLabel = new JLabel();
        
        // 아이콘 생성
        ImageIcon icon = new ImageIcon(
            testImge.class.getResource("../../../../../resources/javaImages/computer.png")
        );

        imgLabel.setIcon(icon);
        
        // 라벨 설정(크기, 정렬...)
        imgLabel.setBounds(210, 30, 165, 150);
        imgLabel.setHorizontalAlignment(JLabel.CENTER);
		
        //프레임에 컴포넌트 추가
    	getContentPane().add(imgLabel);
    	
        // 프레임 보이기 지정
        setVisible(true);
    }
    
}
